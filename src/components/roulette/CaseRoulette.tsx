import type { Component } from "solid-js";
import {
	createSignal,
	onMount,
	createEffect,
	batch,
	For,
	onCleanup,
	Show,
} from "solid-js";
import {
	type CaseItem,
	selectWeightedRandomItem,
	type RoulettePreset,
} from "./types"; // Added RoulettePreset
import RouletteItem from "./RouletteItem";
import ResultModal from "./ResultModal";
import styles from "./CaseRoulette.module.css";
import MapSelectionModal from "./MapSelectionModal";
import MapWeightModal from "./MapWeightModal";
import PresetSelectionModal from "./PresetSelectionModal"; // Import the new modal
import { mapCase as allPossibleMapsArray } from "../MapRoulette/mapCase";

interface CSCaseRouletteProps {
	items: CaseItem[];
	onItemWon?: (item: CaseItem) => void;
	spinDuration?: number; // in seconds
	itemWidth?: number; // Width of each item in pixels
	itemsInView?: number; // Number of items visible in the viewport
	customClassName?: string;
	disabled?: boolean; // Disable the spin button
	showModal?: boolean; // Allow parent to control modal visibility
	enableMapManagement?: boolean; // To control if map modals are active
	allMaps?: CaseItem[]; // All available maps for selection
	initialActiveMaps?: CaseItem[]; // Initially selected maps
	enableSpinDurationSlider?: boolean; // To control if spin duration slider is active
	initialSpinDuration?: number; // Initial spin duration
	presets?: RoulettePreset[]; // Optional array of presets
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
	const [showResultModal, setShowResultModal] = createSignal(false);

	let trackRef: HTMLDivElement | undefined;

	const [allPossibleMaps, _setAllPossibleMaps] = createSignal<CaseItem[]>(
		props.allMaps || allPossibleMapsArray,
	);
	const [activeMaps, setActiveMaps] = createSignal<CaseItem[]>(props.items); // Default to props.items

	const [isMapSelectionModalOpen, setIsMapSelectionModalOpen] =
		createSignal(false);
	const [isMapWeightModalOpen, setIsMapWeightModalOpen] = createSignal(false);
	const [isPresetSelectionModalOpen, setIsPresetSelectionModalOpen] =
		createSignal(false); // State for the new modal

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
		setIsPresetSelectionModalOpen(false); // Close modal after selection
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

	const generateRouletteItems = (
		currentItems: CaseItem[],
		spinDuration: number, // Parameter name matches usage
		itemsInViewCount: number,
	) => {
		if (!currentItems || !currentItems.length) return [];

		// Determine the total number of items to generate for the reel
		// More items for longer spin durations to give the illusion of spinning through more content.
		const itemsPerSecondFactor = 25; // Adjust this to control how many items "pass by" per second
		const minTotalItems = Math.max(150, itemsInViewCount * 10); // Minimum items for a decent visual
		const calculatedItemsBasedOnDuration = spinDuration * itemsPerSecondFactor;

		let totalItemsToGenerate = Math.max(
			minTotalItems,
			calculatedItemsBasedOnDuration,
		);
		// Add an upper cap to prevent performance issues with extremely long reels
		totalItemsToGenerate = Math.min(totalItemsToGenerate, 3000);

		const generatedItems: CaseItem[] = [];

		const allWeightsZero = currentItems.every((item) => item.weight === 0);

		for (let i = 0; i < totalItemsToGenerate; i++) {
			let chosenItem: CaseItem | null = null;

			if (allWeightsZero && currentItems.length > 0) {
				// If all weights are zero (and list is not empty), pick uniformly.
				const randomIndex = Math.floor(Math.random() * currentItems.length);
				chosenItem = currentItems[randomIndex];
			} else if (currentItems.length > 0) {
				// Use weighted selection.
				chosenItem = selectWeightedRandomItem(currentItems);
			}

			if (chosenItem) {
				// Clone the chosen item and assign a unique ID for this slot in the reel.
				const itemForReel = {
					...chosenItem,
					id: `reel-item-${i}-${Date.now()}`,
				};
				generatedItems.push(itemForReel);
			} else if (currentItems.length > 0) {
				// Fallback if chosenItem is null
				const fallbackItem = {
					...currentItems[Math.floor(Math.random() * currentItems.length)], // Pick a random one as fallback
					id: `reel-item-fallback-${i}-${Date.now()}`,
				};
				generatedItems.push(fallbackItem);
				console.warn(
					"CSGOCaseRoulette: Used fallback in generateRouletteItems.",
				);
			}
		}
		return generatedItems;
	};

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

	// Handlers for MapSelectionModal
	const handleOpenMapSelectionModal = () => setIsMapSelectionModalOpen(true);
	const handleCloseMapSelectionModal = () => setIsMapSelectionModalOpen(false);
	const handleSaveMapSelection = (selectedMapIds: (string | number)[]) => {
		const newActiveMaps = allPossibleMaps().filter((map) =>
			selectedMapIds.includes(map.id),
		);
		setActiveMaps(newActiveMaps);
		// Potentially re-generate roulette items if activeMaps changes
		// This is handled by the createEffect on itemsToSpin()
	};

	// Handlers for MapWeightModal
	const handleOpenMapWeightModal = () => setIsMapWeightModalOpen(true);
	const handleCloseMapWeightModal = () => setIsMapWeightModalOpen(false);
	const handleSaveMapWeights = (updatedMapConfigs: CaseItem[]) => {
		setActiveMaps(updatedMapConfigs);
		// Potentially re-generate roulette items if activeMaps weights change
		// This is handled by the createEffect on itemsToSpin()
	};

	// Handlers for PresetSelectionModal
	const handleOpenPresetSelectionModal = () =>
		setIsPresetSelectionModalOpen(true);
	const handleClosePresetSelectionModal = () =>
		setIsPresetSelectionModalOpen(false);

	// Accept a prop to control modal visibility from parent (MapRoulette)
	const shouldShowResultModal = () =>
		props.showModal !== undefined ? props.showModal : showResultModal();

	return (
		<div class={`${styles.rouletteContainer} ${props.customClassName || ""}`}>
			{/* Buttons for map management */}
			<Show when={props.enableMapManagement}>
				<div
					style={{
						display: "flex",
						gap: "10px",
						"margin-bottom": "10px", // Adjusted margin
						"justify-content": "center",
						"flex-wrap": "wrap", // Allow buttons to wrap
					}}
				>
					<button
						type="button"
						onClick={handleOpenMapSelectionModal}
						class={styles.spinButton} // Re-use spinButton style or create a new one
						style={{ "font-size": "14px", padding: "10px 15px" }}
					>
						Select Items
					</button>
					<button
						type="button"
						onClick={handleOpenMapWeightModal}
						class={styles.spinButton} // Re-use spinButton style or create a new one
						style={{ "font-size": "14px", padding: "10px 15px" }}
						disabled={activeMaps().length === 0}
					>
						Item Weights
					</button>
					{/* Button to open Preset Selection Modal */}
					<Show when={props.presets && props.presets.length > 0}>
						<button
							type="button"
							onClick={handleOpenPresetSelectionModal}
							class={styles.spinButton}
							style={{ "font-size": "14px", padding: "10px 15px" }}
						>
							Select Preset
						</button>
					</Show>
				</div>
			</Show>

			{/* Spin Duration Slider */}
			<Show when={props.enableSpinDurationSlider}>
				<div
					style={{
						display: "flex",
						"align-items": "center",
						"justify-content": "center",
						gap: "10px",
						"margin-bottom": "20px",
					}}
				>
					<label
						for="spinDurationSliderInternal"
						style={{ color: "#fff", "font-size": "14px" }}
					>
						Roll Duration:
					</label>
					<input
						id="spinDurationSliderInternal"
						type="range"
						min="1"
						max="60"
						step="0.5"
						value={internalSpinDuration()}
						onInput={(e) =>
							setInternalSpinDuration(Number(e.currentTarget.value))
						}
						style={{ width: "150px" }}
					/>
					<span
						style={{
							color: "#fff",
							"font-size": "14px",
							width: "60px",
							display: "inline-block",
						}}
					>
						{internalSpinDuration().toFixed(1)}s
					</span>
				</div>
			</Show>

			<div class={styles.rouletteViewport}>
				<div class={styles.indicator} />

				<div
					ref={trackRef}
					class={`${styles.rouletteTrack} ${isSpinning() ? styles.spinning : ""}`}
					style={{
						left: `-${spinOffset()}px`,
					}}
				>
					<For each={rouletteItems()}>
						{(item) => (
							<RouletteItem
								item={item}
								width={itemWidth()}
								// isWinner={winningItem()?.id === item.id && item.id?.startsWith('winner-')} // More specific winner check
							/>
						)}
					</For>
				</div>
			</div>

			<button
				type="button"
				class={styles.spinButton}
				onClick={() => handleSpin()}
				disabled={isSpinning() || props.disabled || itemsToSpin().length === 0}
			>
				{isSpinning() ? "Spinning..." : "Spin"}
			</button>

			<ResultModal
				isOpen={shouldShowResultModal()}
				onClose={handleCloseResultModal}
				item={winningItem()}
			/>

			<Show when={props.enableMapManagement}>
				<MapSelectionModal
					isOpen={isMapSelectionModalOpen()}
					onClose={handleCloseMapSelectionModal}
					allMaps={allPossibleMaps()} // Pass allPossibleMaps signal
					activeMapIds={activeMaps().map((map) => map.id)}
					onSave={handleSaveMapSelection}
				/>

				<MapWeightModal
					isOpen={isMapWeightModalOpen()}
					onClose={handleCloseMapWeightModal}
					currentMapConfigs={activeMaps()} // Pass activeMaps signal
					onSave={handleSaveMapWeights}
				/>

				{/* Preset Selection Modal */}
				<Show when={props.presets && props.presets.length > 0}>
					<PresetSelectionModal
						isOpen={isPresetSelectionModalOpen()}
						onClose={handleClosePresetSelectionModal}
						presets={props.presets || []}
						onPresetSelect={handlePresetSelect}
					/>
				</Show>
			</Show>
		</div>
	);
};

export default CaseRoulette;
