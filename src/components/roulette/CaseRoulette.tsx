import type { Component } from "solid-js";
import {
	createSignal,
	onMount,
	createEffect,
	batch,
	onCleanup,
	Show,
} from "solid-js";
import type { CaseItem, RoulettePreset } from "./types";
import { generateRouletteItems, selectWeightedRandomItem } from "./utils";
import styles from "./CaseRoulette.module.css";
import MapManagementButtons from "./MapManagementButtons";
import { mapCase as allPossibleMapsArray } from "../MapRoulette/mapCase";
import RouletteControls from "./RouletteControls/RouletteControls"; // Import the new composite component
import RouletteDisplay from "./RouletteDisplay/RouletteDisplay";
import WonItemsHistory from "./WonItemsHistory/WonItemsHistory";
import ResultModal from "./modals/ResultModal/ResultModal";

interface CSCaseRouletteProps {
	items: CaseItem[];
	onItemWon?: (item: CaseItem) => void;
	spinDuration?: number; // in seconds
	itemWidth?: number; // Width of each item in pixels
	itemsInView?: number; // Number of items visible in the viewport
	customClassName?: string;
	disabled?: boolean; // Disable the spin button
	showModal?: boolean; // Allow parent to control modal visibility (e.g., force hide)
	enableMapManagement?: boolean; // To control if map modals are active
	allMaps?: CaseItem[]; // All available maps for selection
	initialActiveMaps?: CaseItem[]; // Initially selected maps
	enableSpinDurationSlider?: boolean; // To control if spin duration slider is active
	initialSpinDuration?: number; // Initial spin duration
	presets?: RoulettePreset[]; // Optional array of presets
	showWonItemsHistory?: boolean; // New prop
	wonItems?: CaseItem[]; // New prop - list of items for history
	historyTitle?: string; // New prop - title for history section
	historyItemWidth?: number; // New prop - item width for history items
	// showResultModalToggle and onShowResultModalToggleChange are removed
}

const CaseRoulette: Component<CSCaseRouletteProps> = (props) => {
	const [itemWidth, setItemWidth] = createSignal(props.itemWidth || 140);
	const [itemsInView, setItemsInView] = createSignal(props.itemsInView || 5);
	const [internalSpinDuration, setInternalSpinDuration] = createSignal(
		props.initialSpinDuration || props.spinDuration || 8,
	);

	const itemMarginHorizontal = 4; // pixels
	const actualItemSpace = () => itemWidth() + itemMarginHorizontal * 2; // Total horizontal space per item

	const [isSpinning, setIsSpinning] = createSignal(false);
	const [rouletteItems, setRouletteItems] = createSignal<CaseItem[]>([]);
	const [spinOffset, setSpinOffset] = createSignal(0);
	const [winningItem, setWinningItem] = createSignal<CaseItem | null>(null);
	const [showResultModal, setShowResultModal] = createSignal(false); // True when spin ends and modal *should* try to show
	const [
		internalDisplayResultModalToggle,
		setInternalDisplayResultModalToggle,
	] = createSignal(true); // Internal state for the checkbox

	let trackRef: HTMLDivElement | undefined;
	const assignTrackRef = (el: HTMLDivElement) => {
		trackRef = el;
	};

	const [allPossibleMaps, _setAllPossibleMaps] = createSignal<CaseItem[]>(
		props.allMaps || allPossibleMapsArray,
	);
	const [activeMaps, setActiveMaps] = createSignal<CaseItem[]>(props.items); // Default to props.items

	// Update items for the roulette based on activeMaps if map management is enabled
	const itemsToSpin = () =>
		props.enableMapManagement ? activeMaps() : props.items;

	// Use internalSpinDuration if slider is enabled, otherwise props.spinDuration
	const currentSpinDuration = () =>
		props.enableSpinDurationSlider
			? internalSpinDuration()
			: props.spinDuration || 8;

	const handlePresetSelect = (preset: RoulettePreset) => {
		const newActiveMaps = allPossibleMaps().filter((map) =>
			preset.itemNames.includes(map.name),
		);
		setActiveMaps(newActiveMaps);
	};

	// Function to update dimensions based on window size
	const updateDimensions = () => {
		if (window.innerWidth <= 480) {
			setItemWidth(100);
			setItemsInView(3);
		} else if (window.innerWidth <= 768) {
			setItemWidth(120);
			setItemsInView(4);
		} else {
			setItemWidth(props.itemWidth || 140);
			setItemsInView(props.itemsInView || 5);
		}
	};

	// Initialize and add resize listener
	onMount(() => {
		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		if (props.enableMapManagement) {
			if (props.initialActiveMaps) {
				setActiveMaps(props.initialActiveMaps);
			} else if (props.allMaps) {
				// If allMaps is provided but not initialActiveMaps, set allMaps as active initially
				setActiveMaps(props.allMaps);
			} else {
				// Default to allPossibleMapsArray if nothing specific is provided for map management
				setActiveMaps(allPossibleMapsArray);
			}
		} else {
			// If map management is not enabled, ensure activeMaps reflects props.items
			setActiveMaps(props.items);
		}
	});

	// Cleanup resize listener
	onCleanup(() => {
		window.removeEventListener("resize", updateDimensions);
	});

	// Effect to update activeMaps if props.items changes and map management is not enabled
	createEffect(() => {
		if (!props.enableMapManagement) {
			setActiveMaps(props.items);
		}
	});

	// Regenerate roulette items when the source items, spin duration, or view configuration changes
	createEffect(() => {
		const currentPropItems = itemsToSpin();
		const duration = currentSpinDuration(); // Use reactive spin duration
		const inViewCount = itemsInView();

		setRouletteItems(
			generateRouletteItems(currentPropItems, duration, inViewCount),
		);
	});

	// Update the CSS variable for spin duration
	createEffect(() => {
		if (!trackRef) return;
		const duration = currentSpinDuration(); // Use reactive spin duration
		trackRef.style.setProperty("--spin-duration", `${duration}s`);
		trackRef.style.setProperty("--item-width", `${itemWidth()}px`);
		trackRef.style.setProperty(
			"--item-margin-horizontal",
			`${itemMarginHorizontal}px`,
		);
		trackRef.style.setProperty("--actual-item-space", `${actualItemSpace()}px`);
	});

	const handleSpin = (): void => {
		const currentItemsForSpin = itemsToSpin(); // Use reactive items
		if (isSpinning() || !currentItemsForSpin.length || !trackRef) return;

		// 1. Determine a winning item using weighted probability from the current items
		const winnerFromPool = selectWeightedRandomItem(currentItemsForSpin);

		// Ensure winnerFromPool is not null before proceeding
		if (!winnerFromPool) {
			console.error(
				"CSGOCaseRoulette: Could not determine a winner from the pool.",
			);
			return; // Cannot spin if no winner can be selected
		}

		// 2. Prepare roulette items and place the winner
		const currentVisualItems = rouletteItems(); // these are already generated based on itemsToSpin()
		const winnerIndex =
			Math.floor(currentVisualItems.length * 0.7) +
			Math.floor(Math.random() * Math.floor(currentVisualItems.length * 0.2));

		const newItems = [...currentVisualItems];
		const actualWinnerInArray = {
			...winnerFromPool,
			id: `winner-${winnerIndex}-${Date.now()}`,
		};
		newItems[winnerIndex] = actualWinnerInArray;

		// 3. Calculate where to stop the animation to center the winner
		const viewportVisualWidth = itemsInView() * actualItemSpace();
		const indicatorPositionInViewport = viewportVisualWidth / 2;
		const winnerItemCenterInTrack =
			winnerIndex * actualItemSpace() + actualItemSpace() / 2;
		const targetOffset = winnerItemCenterInTrack - indicatorPositionInViewport;
		const randomJitter = (Math.random() - 0.5) * (actualItemSpace() * 0.3);
		const finalOffset = targetOffset + randomJitter;

		// 4. Start the spin
		batch(() => {
			setRouletteItems(newItems);
			setIsSpinning(true);
			setWinningItem(actualWinnerInArray);

			if (trackRef) {
				trackRef.style.transition = "none";
				trackRef.style.left = "0px";
				void trackRef.offsetWidth;
				trackRef.style.transition = "";

				const handleTransitionEnd = (event: TransitionEvent) => {
					if (event.propertyName === "left" && trackRef) {
						trackRef.removeEventListener("transitionend", handleTransitionEnd);
						setIsSpinning(false);
						setShowResultModal(true); // Show result modal
						if (props.onItemWon) {
							props.onItemWon(actualWinnerInArray);
						}
					}
				};
				trackRef.addEventListener("transitionend", handleTransitionEnd);

				setTimeout(() => {
					if (trackRef) {
						setSpinOffset(finalOffset);
					}
				}, 50);
			}
		});
	};

	const handleCloseResultModal = (): void => {
		setShowResultModal(false);
	};

	// Modal visibility logic:
	// 1. Parent can force-hide with props.showModal = false.
	// 2. Otherwise, depends on spin completion (showResultModal()) AND internal checkbox (internalDisplayResultModalToggle()).
	const shouldActuallyShowResultModal = () =>
		props.showModal !== false &&
		showResultModal() &&
		internalDisplayResultModalToggle();

	// Combined disabled state for the spin button
	const isSpinButtonDisabled = () =>
		isSpinning() || props.disabled || itemsToSpin().length === 0;

	return (
		<div class={`${styles.rouletteContainer} ${props.customClassName || ""}`}>
			<MapManagementButtons
				enableMapManagement={props.enableMapManagement}
				presets={props.presets}
				activeMaps={activeMaps()}
				allPossibleMaps={allPossibleMaps()}
				onActiveMapsChange={setActiveMaps}
				onPresetSelect={handlePresetSelect}
			/>

			<RouletteControls
				showResultModalToggle={internalDisplayResultModalToggle}
				onShowResultModalToggleChange={setInternalDisplayResultModalToggle}
				enableSpinDurationSlider={() => props.enableSpinDurationSlider}
				internalSpinDuration={internalSpinDuration}
				setInternalSpinDuration={setInternalSpinDuration}
				isSpinning={isSpinning}
			/>

			<RouletteDisplay
				isSpinning={isSpinning}
				spinOffset={spinOffset}
				rouletteItems={rouletteItems}
				itemWidth={itemWidth}
				assignTrackRef={assignTrackRef}
				onSpinClick={handleSpin}
				isSpinButtonDisabled={isSpinButtonDisabled}
			/>

			<ResultModal
				isOpen={shouldActuallyShowResultModal()}
				onClose={handleCloseResultModal}
				item={winningItem()}
			/>

			<Show
				when={
					props.showWonItemsHistory &&
					props.wonItems &&
					props.wonItems.length > 0
				}
			>
				<WonItemsHistory
					items={props.wonItems || []}
					title={props.historyTitle || "History"}
					itemWidth={props.historyItemWidth}
				/>
			</Show>
		</div>
	);
};

export default CaseRoulette;
