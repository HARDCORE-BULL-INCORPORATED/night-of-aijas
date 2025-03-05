import { Component } from "solid-js";
import styles from "./TacticRoller.module.css";
import { TacticItem, getItemBorderClass } from "./tacticsTypes";

const DetailsSection: Component<{
  selectedTactic: TacticItem | null;
}> = (props) => {
  return (
    <div class={styles.detailsSection}>
      <div class={styles.detailsHeader}>
        <h2>Tactic Details</h2>
      </div>

      {props.selectedTactic ? (
        <div class={styles.tacticDetails}>
          <div
            class={`${styles.detailsCard} ${getItemBorderClass(
              props.selectedTactic.color
            )}`}
          >
            <img
              src={props.selectedTactic.image}
              alt={props.selectedTactic.name}
            />
          </div>
          <h2>{props.selectedTactic.name}</h2>
          <p class={styles.rarityTag}>{props.selectedTactic.rarity}</p>
          <div class={styles.tacticDescription}>
            <p>
              This is a {props.selectedTactic.rarity.toLowerCase()} ranked
              tactic.
            </p>
            <p>Use this tactic wisely in your next match!</p>
            <div class={styles.tacticStats}>
              <div class={styles.statItem}>
                <span class={styles.statLabel}>Power</span>
                <div class={styles.statBar}>
                  <div
                    class={styles.statFill}
                    style={{
                      width: `${Math.floor(Math.random() * 40) + 60}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div class={styles.statItem}>
                <span class={styles.statLabel}>Strategy</span>
                <div class={styles.statBar}>
                  <div
                    class={styles.statFill}
                    style={{
                      width: `${Math.floor(Math.random() * 40) + 60}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div class={styles.statItem}>
                <span class={styles.statLabel}>Surprise</span>
                <div class={styles.statBar}>
                  <div
                    class={styles.statFill}
                    style={{
                      width: `${Math.floor(Math.random() * 40) + 60}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class={styles.noTacticSelected}>
          <p>Select a tactic from your inventory to view details</p>
        </div>
      )}
    </div>
  );
};

export default DetailsSection;
