import { Component, For } from "solid-js";
import styles from "./TacticRoulette.module.css";
import { TacticItem, getItemBorderClass } from "./tacticsTypes";
import RouletteItem from "./RouletteItem";
import tacticStyles from "./TacticRoller.module.css";

const RollerSection: Component<{
  isOpening: boolean;
  onOpenCase: () => void;
  obtainedItem: TacticItem | null;
  inventory: TacticItem[];
  selectedTactic: TacticItem | null;
  onClearInventory: () => void;
  onSelectTactic: (tactic: TacticItem) => void;
  rouletteContainerRef: (el: HTMLDivElement) => void;
  tacticsRef: (el: HTMLDivElement) => void;
  handleTransitionEnd: () => void;
  rouletteTactics: TacticItem[];
  prizeTacticId: number;
  isSpinEnded: boolean;
}> = (props) => {
  return (
    <div class={tacticStyles.rollerSection}>
      {/* Roulette UI */}
      <div class={styles.rouletteWrapper}>
        <button
          onClick={props.onOpenCase}
          disabled={props.isOpening}
          class="cs-btn"
          style={{
            width: "auto",
            "align-self": "center",
            "margin-top": "10px",
            "margin-bottom": "10px",
          }}
        >
          {props.isOpening ? "Rolling Tactic..." : "Roll Tactic"}
        </button>

        <div
          ref={props.rouletteContainerRef}
          style={{ overflow: "hidden", width: "100%" }}
        >
          <div class={styles.roulette}>
            <div class={styles.target}></div>
            <div
              ref={props.tacticsRef}
              class={styles.tactics}
              onTransitionEnd={props.handleTransitionEnd}
            >
              <For each={props.rouletteTactics}>
                {(tactic, i) => (
                  <RouletteItem
                    tactic={tactic}
                    isLoser={
                      i() !== props.prizeTacticId &&
                      !props.isOpening &&
                      props.isSpinEnded
                    }
                  />
                )}
              </For>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory section */}
      <div class={tacticStyles.inventory}>
        <div class={tacticStyles.inventoryHeader}>
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
          <p class={tacticStyles.emptyInventory}>
            Your inventory is empty. Roll some tactics!
          </p>
        ) : (
          <div class={tacticStyles.inventoryGrid}>
            <For each={props.inventory}>
              {(item) => (
                <div
                  class={`${tacticStyles.inventoryItem} ${
                    props.selectedTactic === item ? tacticStyles.selected : ""
                  }`}
                  onClick={() => props.onSelectTactic(item)}
                >
                  <div
                    class={`${tacticStyles.inventoryCard} ${getItemBorderClass(
                      item.color
                    )}`}
                  >
                    <img src={item.image} alt={item.name} />
                  </div>
                  <p class={tacticStyles.inventoryItemName}>{item.name}</p>
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
