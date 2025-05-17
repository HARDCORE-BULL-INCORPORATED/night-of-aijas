import type { Component } from "solid-js";
import {
    createSignal,
    onMount,
    createEffect,
    batch,
    For,
    onCleanup,
} from "solid-js";
import {
    type CSGOItem,
    type CSGOCaseRouletteProps,
    selectWeightedRandomItem,
} from "./types";
import RouletteItem from "./RouletteItem";
import ResultModal from "./ResultModal";
import styles from "./CSGOCaseRoulette.module.css";

const CSGOCaseRoulette: Component<CSGOCaseRouletteProps> = (props) => {
    // Default props
    const [itemWidth, setItemWidth] = createSignal(props.itemWidth || 140);
    const [itemsInView, setItemsInView] = createSignal(props.itemsInView || 5);

    const itemMarginHorizontal = 4; // From RouletteItem.module.css (4px each side)
    const actualItemSpace = () => itemWidth() + itemMarginHorizontal * 2; // Total horizontal space per item

    const spinDuration = props.spinDuration || 8;

    // State
    const [isSpinning, setIsSpinning] = createSignal(false);
    const [rouletteItems, setRouletteItems] = createSignal<CSGOItem[]>([]);
    const [spinOffset, setSpinOffset] = createSignal(0);
    const [winningItem, setWinningItem] = createSignal<CSGOItem | null>(null);
    const [showModal, setShowModal] = createSignal(false);

    // Refs
    let trackRef: HTMLDivElement | undefined;

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
    });

    // Cleanup resize listener
    onCleanup(() => {
        window.removeEventListener("resize", updateDimensions);
    });

    // Regenerate roulette items when the source items or view configuration changes
    createEffect(() => {
        setRouletteItems(generateRouletteItems());
    });

    // Generate a set of items for the roulette
    const generateRouletteItems = () => {
        if (!props.items.length) return [];

        // We need enough items to fill the roulette multiple times
        const totalItemsToGenerate = Math.max(100, itemsInView() * 5); // Use itemsInView()
        const generatedItems: CSGOItem[] = [];

        // Add random items until we reach the desired count
        for (let i = 0; i < totalItemsToGenerate; i++) {
            // Use totalItemsToGenerate
            // Clone a random item from the props
            const randomIndex = Math.floor(Math.random() * props.items.length);
            const item = { ...props.items[randomIndex], id: `item-${i}` };
            generatedItems.push(item);
        }

        return generatedItems;
    };

    // Update the CSS variable for spin duration
    createEffect(() => {
        if (!trackRef) return;
        trackRef.style.setProperty("--spin-duration", `${spinDuration}s`);
        // Set item width and margin as CSS variables for potential use in CSS if needed for alignment
        trackRef.style.setProperty("--item-width", `${itemWidth()}px`);
        trackRef.style.setProperty(
            "--item-margin-horizontal",
            `${itemMarginHorizontal}px`,
        );
        trackRef.style.setProperty(
            "--actual-item-space",
            `${actualItemSpace()}px`,
        );
    });

    // Handle the spin
    const handleSpin = (): void => {
        if (isSpinning() || !props.items.length || !trackRef) return;

        // 1. Determine a winning item using weighted probability
        const winnerFromPool = selectWeightedRandomItem(props.items);

        // 2. Prepare roulette items and place the winner
        const items = rouletteItems();
        const winnerIndex =
            Math.floor(items.length * 0.7) +
            Math.floor(Math.random() * Math.floor(items.length * 0.2));

        const newItems = [...items];
        // Ensure the winner item in the array has a unique ID for reliable rendering and state tracking
        const actualWinnerInArray = {
            ...winnerFromPool,
            id: `winner-${winnerIndex}-${Date.now()}`,
        };
        newItems[winnerIndex] = actualWinnerInArray;

        // 3. Calculate where to stop the animation to center the winner
        // Viewport visual width (the part of the track that is visible)
        const viewportVisualWidth = itemsInView() * actualItemSpace(); // Use itemsInView() and actualItemSpace()
        // The indicator is assumed to be at the center of this visual viewport
        const indicatorPositionInViewport = viewportVisualWidth / 2;

        // Center of the item at winnerIndex, in track coordinates
        const winnerItemCenterInTrack =
            winnerIndex * actualItemSpace() + actualItemSpace() / 2; // Use actualItemSpace()

        // We want: winnerItemCenterInTrack - finalOffset = indicatorPositionInViewport
        // So: finalOffset = winnerItemCenterInTrack - indicatorPositionInViewport
        const targetOffset =
            winnerItemCenterInTrack - indicatorPositionInViewport;

        // Add a random jitter to make the stop position less predictable
        // Jitter is up to +/- 15% of an item's total space
        const randomJitter = (Math.random() - 0.5) * (actualItemSpace() * 0.3); // Use actualItemSpace()
        const finalOffset = targetOffset + randomJitter;

        // 4. Start the spin
        batch(() => {
            setRouletteItems(newItems);
            setIsSpinning(true);
            setWinningItem(actualWinnerInArray); // Set the exact item from the array as the winner state

            if (trackRef) {
                // Reset position before spin, then apply target offset to trigger animation.
                trackRef.style.transition = "none"; // Temporarily disable transition for reset
                trackRef.style.left = "0px"; // Reset to initial position
                void trackRef.offsetWidth; // Force reflow to apply the reset immediately
                trackRef.style.transition = ""; // IMPORTANT: Clear inline transition to allow class transition to take over

                // The .spinning class (applied due to isSpinning() being true) should now define the transition.

                const handleTransitionEnd = (event: TransitionEvent) => {
                    if (event.propertyName === "left" && trackRef) {
                        // Ensure it's the 'left' transition
                        trackRef.removeEventListener(
                            "transitionend",
                            handleTransitionEnd,
                        );
                        setIsSpinning(false);
                        setShowModal(true);
                        if (props.onItemWon) {
                            props.onItemWon(actualWinnerInArray); // Pass the same winner object
                        }
                    }
                };
                trackRef.addEventListener("transitionend", handleTransitionEnd);

                // Set the final offset to start the animation.
                // Needs a slight delay for the DOM to update and transition to apply correctly.
                setTimeout(() => {
                    if (trackRef) {
                        // Re-check ref in timeout
                        setSpinOffset(finalOffset);
                    }
                }, 50);
            }
        });
    };

    // Handle modal close
    const handleCloseModal = (): void => {
        setShowModal(false);
    };

    return (
        <div
            class={`${styles.rouletteContainer} ${props.customClassName || ""}`}
        >
            <div class={styles.rouletteViewport}>
                <div class={styles.indicator} />

                <div
                    ref={trackRef}
                    class={`${styles.rouletteTrack} ${isSpinning() ? styles.spinning : ""}`}
                    style={{
                        left: isSpinning() ? `-${spinOffset()}px` : "0px",
                    }}
                >
                    <For each={rouletteItems()}>
                        {(item) => (
                            <RouletteItem
                                item={item}
                                width={itemWidth()} // Use itemWidth()
                                isWinner={Boolean(
                                    winningItem() &&
                                    item.id === winningItem()?.id,
                                )}
                            />
                        )}
                    </For>
                </div>
            </div>

            <button
                type="button"
                class={styles.spinButton}
                onClick={() => handleSpin()}
                disabled={isSpinning() || props.disabled || !props.items.length}
            >
                {isSpinning() ? "Opening..." : "Open Case"}
            </button>

            <ResultModal
                isOpen={showModal()}
                onClose={handleCloseModal}
                item={winningItem()}
            />
        </div>
    );
};

export default CSGOCaseRoulette;
