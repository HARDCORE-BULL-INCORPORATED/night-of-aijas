import { Component } from "solid-js";
import { TacticItem } from "./tacticsTypes";
import tacticStyles from "./TacticRoller.module.css";

const DetailsSection: Component<{
  selectedTactic: TacticItem | null;
}> = (props) => {
  return (
    <div class={tacticStyles.detailsSection}>
      {props.selectedTactic ? (
        <div class={tacticStyles.detailsContent}>
          <img
            src={props.selectedTactic.image}
            alt={props.selectedTactic.name}
            class={tacticStyles.detailsImage}
            width="150px"
            height="150px"
          />
          <div class={tacticStyles.detailsInfo}>
            <h2>{props.selectedTactic.name}</h2>
            <p>
              <strong>Rarity:</strong> {props.selectedTactic.rarity}
            </p>
            {props.selectedTactic.description && (
              <h5 style={{ "font-size": "0.9em" }}>
                {props.selectedTactic.description}
              </h5>
            )}
          </div>
        </div>
      ) : (
        <div class={tacticStyles.noSelection}>
          <p>Select a tactic to view details</p>
        </div>
      )}
    </div>
  );
};

export default DetailsSection;
