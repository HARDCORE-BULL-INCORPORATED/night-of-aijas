import type { Component } from "solid-js";
import { createSignal, onMount, createEffect, batch, For } from "solid-js";
import { type CSGOItem, type CSGOCaseRouletteProps, selectWeightedRandomItem } from "./types";
import RouletteItem from "./RouletteItem";
import ResultModal from "./ResultModal";
import styles from "./CSGOCaseRoulette.module.css";

const CSGOCaseRoulette: Component<CSGOCaseRouletteProps> = (props) => {
  // Default props
  const itemWidth = props.itemWidth || 140; // CSS width of the item content area
  const itemMarginHorizontal = 4; // From RouletteItem.module.css (4px each side)
  const actualItemSpace = itemWidth + (itemMarginHorizontal * 2); // Total horizontal space per item

  const itemsInView = () => props.itemsInView || 5;
  const spinDuration = props.spinDuration || 8;

  // State
  const [isSpinning, setIsSpinning] = createSignal(false);
  const [rouletteItems, setRouletteItems] = createSignal<CSGOItem[]>([]);
  const [spinOffset, setSpinOffset] = createSignal(0);
  const [winningItem, setWinningItem] = createSignal<CSGOItem | null>(null);
  const [showModal, setShowModal] = createSignal(false);

  // Refs
  let trackRef: HTMLDivElement | undefined;

  // Generate a set of items for the roulette
  const generateRouletteItems = () => {
    if (!props.items.length) return [];

    // We need enough items to fill the roulette multiple times
    const totalItems = Math.max(100, itemsInView() * 5);
    const generatedItems: CSGOItem[] = [];

    // Add random items until we reach the desired count
    for (let i = 0; i < totalItems; i++) {
      // Clone a random item from the props
      const randomIndex = Math.floor(Math.random() * props.items.length);
      const item = { ...props.items[randomIndex], id: `item-${i}` };
      generatedItems.push(item);
    }

    return generatedItems;
  };

  // Initialize the roulette on mount
  onMount(() => {
    setRouletteItems(generateRouletteItems());
  });

  // Update the CSS variable for spin duration
  createEffect(() => {
    if (!trackRef) return;
    trackRef.style.setProperty('--spin-duration', `${spinDuration}s`);
    // Set item width and margin as CSS variables for potential use in CSS if needed for alignment
    trackRef.style.setProperty('--item-width', `${itemWidth}px`);
    trackRef.style.setProperty('--item-margin-horizontal', `${itemMarginHorizontal}px`);
    trackRef.style.setProperty('--actual-item-space', `${actualItemSpace}px`);
  });

  // Handle the spin
  const handleSpin = (): void => {
    if (isSpinning() || !props.items.length || !trackRef) return;

    // 1. Determine a winning item using weighted probability
    const winnerFromPool = selectWeightedRandomItem(props.items);

    // 2. Prepare roulette items and place the winner
    const items = rouletteItems();
    const winnerIndex = Math.floor(items.length * 0.7) +
      Math.floor(Math.random() * Math.floor(items.length * 0.2));

    const newItems = [...items];
    // Ensure the winner item in the array has a unique ID for reliable rendering and state tracking
    const actualWinnerInArray = { ...winnerFromPool, id: `winner-${winnerIndex}-${Date.now()}` };
    newItems[winnerIndex] = actualWinnerInArray;

    // 3. Calculate where to stop the animation to center the winner
    // Viewport visual width (the part of the track that is visible)
    const viewportVisualWidth = itemsInView() * actualItemSpace;
    // The indicator is assumed to be at the center of this visual viewport
    const indicatorPositionInViewport = viewportVisualWidth / 2;

    // Center of the item at winnerIndex, in track coordinates
    const winnerItemCenterInTrack = (winnerIndex * actualItemSpace) + (actualItemSpace / 2);

    // We want: winnerItemCenterInTrack - finalOffset = indicatorPositionInViewport
    // So: finalOffset = winnerItemCenterInTrack - indicatorPositionInViewport
    let targetOffset = winnerItemCenterInTrack - indicatorPositionInViewport;

    // Add a random jitter to make the stop position less predictable
    // Jitter is up to +/- 15% of an item's total space
    const randomJitter = (Math.random() - 0.5) * (actualItemSpace * 0.3);
    const finalOffset = targetOffset + randomJitter;

    // 4. Start the spin
    batch(() => {
      setRouletteItems(newItems);
      setIsSpinning(true);
      setWinningItem(actualWinnerInArray); // Set the exact item from the array as the winner state

      if (trackRef) {
        // Reset position before spin, then apply target offset to trigger animation.
        trackRef.style.transition = 'none'; // Temporarily disable transition for reset
        trackRef.style.left = '0px';        // Reset to initial position
        void trackRef.offsetWidth;         // Force reflow to apply the reset immediately
        trackRef.style.transition = '';     // IMPORTANT: Clear inline transition to allow class transition to take over

        // The .spinning class (applied due to isSpinning() being true) should now define the transition.

        const handleTransitionEnd = (event: TransitionEvent) => {
          if (event.propertyName === 'left' && trackRef) { // Ensure it's the 'left' transition
            trackRef.removeEventListener('transitionend', handleTransitionEnd);
            setIsSpinning(false);
            setShowModal(true);
            if (props.onItemWon) {
              props.onItemWon(actualWinnerInArray); // Pass the same winner object
            }
          }
        };
        trackRef.addEventListener('transitionend', handleTransitionEnd);

        // Set the final offset to start the animation.
        // Needs a slight delay for the DOM to update and transition to apply correctly.
        setTimeout(() => {
          if (trackRef) { // Re-check ref in timeout
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
    <div class={`${styles.rouletteContainer} ${props.customClassName || ''}`}>
      <div class={styles.rouletteViewport}>
        <div class={styles.indicator} />

        <div
          ref={trackRef}
          class={`${styles.rouletteTrack} ${isSpinning() ? styles.spinning : ''}`}
          style={{
            left: isSpinning() ? `-${spinOffset()}px` : '0px',
          }}
        >
          <For each={rouletteItems()}>
            {(item) => (
              <RouletteItem
                item={item}
                width={itemWidth}
                isWinner={Boolean(winningItem() && item.id === winningItem()?.id)}
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
        {isSpinning() ? 'Opening...' : 'Open Case'}
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