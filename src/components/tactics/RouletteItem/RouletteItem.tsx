import { Component } from "solid-js";
import styles from "./RouletteItem.module.css";
import { TacticItem, getItemBackgroundClass } from "../tacticsTypes";

interface RouletteItemProps {
  tactic: TacticItem;
  isLoser?: boolean;
}

const RouletteItem: Component<RouletteItemProps> = (props) => {
  return (
    <div
      class={styles.tactic}
      style={props.isLoser ? { opacity: "0.5" } : { opacity: "1" }}
    >
      <div class={styles.tacticInner}>
        <div
          class={`${styles.tacticRarity} ${getItemBackgroundClass(
            props.tactic.color
          )}`}
        ></div>
        <img src={props.tactic.image} alt={props.tactic.name} />
        <div class={styles.tacticText}>
          <p>{props.tactic.name}</p>
          <p>{props.tactic.rarity}</p>
        </div>
      </div>
    </div>
  );
};

export default RouletteItem;
