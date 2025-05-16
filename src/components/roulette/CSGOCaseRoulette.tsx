import type { Component } from "solid-js";
import { createSignal, onMount, createEffect, batch, For } from "solid-js";
import { type CSGOItem, type CSGOCaseRouletteProps, selectWeightedRandomItem } from "./types";
import RouletteItem from "./RouletteItem";
import ResultModal from "./ResultModal";
import styles from "./CSGOCaseRoulette.module.css";

const CSGOCaseRoulette: Component<CSGOCaseRouletteProps> = (props) => {
  // Default props
  const itemWidth = props.itemWidth || 140;
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
  });
  
  // Handle the spin
  const handleSpin = (): void => {
    if (isSpinning() || !props.items.length || !trackRef) return;
    
    // 1. Determine a winning item using weighted probability
    const winner = selectWeightedRandomItem(props.items);
    
    // 2. Find a good position for the winning item
    const items = rouletteItems();
    const viewportWidth = itemsInView() * itemWidth;
    
    // Replace a random item in the middle-end section with our winner
    const winnerIndex = Math.floor(items.length * 0.7) + 
                        Math.floor(Math.random() * Math.floor(items.length * 0.2));
    
    const newItems = [...items];
    newItems[winnerIndex] = { ...winner, id: `winner-${Date.now()}` };
    
    // 3. Calculate where to stop the animation (center the winner)
    const indicatorPosition = viewportWidth / 2;
    const winnerPosition = winnerIndex * itemWidth;
    const offset = winnerPosition - indicatorPosition + (itemWidth / 2);
    
    // Small random offset to make it look more natural
    const randomOffset = Math.random() * (itemWidth * 0.3) - (itemWidth * 0.15);
    const finalOffset = offset + randomOffset;
    
    // 4. Start the spin
    batch(() => {
      setRouletteItems(newItems);
      setIsSpinning(true);
      setWinningItem(winner);
      
      // Reset position before spinning
      if (trackRef) {
        trackRef.style.transition = 'none';
        trackRef.style.left = '0px';
        // Force reflow
        void trackRef.offsetWidth;
        trackRef.style.transition = '';
      }
      
      // Start the spin with a small delay
      setTimeout(() => {
        setSpinOffset(finalOffset);
      }, 50);
    });
    
    // 5. Handle completion
    setTimeout(() => {
      setIsSpinning(false);
      setShowModal(true);
      
      if (props.onItemWon) {
        props.onItemWon(winner);
      }
    }, spinDuration * 1000);
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