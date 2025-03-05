import { Component, For } from "solid-js";
import styles from "./TacticRoller.module.css";
import { TacticItem, getItemBorderClass } from "./tacticsTypes";

const RollerSection: Component<{
  isOpening: boolean;
  onOpenCase: () => void;
  obtainedItem: TacticItem | null;
  inventory: TacticItem[];
  selectedTactic: TacticItem | null;
  onClearInventory: () => void;
  onSelectTactic: (tactic: TacticItem) => void;
}> = (props) => {
  return (
    <div class={styles.rollerSection}>
      <button
        onClick={props.onOpenCase}
        disabled={props.isOpening}
        class="cs-btn"
        style={{
          width: "auto",
          "align-self": "center",
          "margin-top": "10px",
        }}
      >
        {props.isOpening ? "Rolling Tactic..." : "Roll Tactic"}
      </button>

      <div class={styles.resultDisplay}>
        {props.isOpening ? (
          <div class={styles.openingAnimation}>
            <div class={styles.chevronDown}></div>
            <p>Revealing tactic...</p>
          </div>
        ) : props.obtainedItem ? (
          <div class={styles.obtainedItem}>
            <div
              class={`${styles.itemCard} ${getItemBorderClass(
                props.obtainedItem.color
              )}`}
            >
              <img
                src={props.obtainedItem.image}
                alt={props.obtainedItem.name}
              />
            </div>
            <h2>{props.obtainedItem.name}</h2>
            <p>{props.obtainedItem.rarity}</p>
          </div>
        ) : (
          <div class={styles.initialState}>
            <div class={styles.giftIcon}></div>
            <p>Click 'Roll Tactic' to begin</p>
          </div>
        )}
      </div>

      <div class={styles.inventory}>
        <div class={styles.inventoryHeader}>
          <h2>Previous Tactics</h2>
          {props.inventory.length > 0 && (
            <button
              onClick={props.onClearInventory}
              class="cs-btn cs-btn-danger cs-btn-sm"
            >
              Clear All
            </button>
          )}
        </div>

        {props.inventory.length === 0 ? (
          <p class={styles.emptyInventory}>
            Your inventory is empty. Roll some tactics!
          </p>
        ) : (
          <div class={styles.inventoryGrid}>
            <For each={props.inventory}>
              {(item) => (
                <div
                  class={`${styles.inventoryItem} ${
                    props.selectedTactic === item ? styles.selected : ""
                  }`}
                  onClick={() => props.onSelectTactic(item)}
                >
                  <div
                    class={`${styles.inventoryCard} ${getItemBorderClass(
                      item.color
                    )}`}
                  >
                    <img src={item.image} alt={item.name} />
                  </div>
                  <p class={styles.inventoryItemName}>{item.name}</p>
                </div>
              )}
            </For>
          </div>
        )}
      </div>
    </div>
  );
};

export default RollerSection;
