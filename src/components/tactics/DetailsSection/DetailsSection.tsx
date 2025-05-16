import type { Component } from "solid-js";
import type { TacticItem } from "../tacticsTypes";
import styles from "./DetailsSection.module.css";

const DetailsSection: Component<{
    selectedTactic: TacticItem | null;
}> = (props) => {
    return (
        <div class={styles.detailsSection}>
            {props.selectedTactic ? (
                <div class={styles.detailsContent}>
                    <img
                        src={props.selectedTactic.image}
                        alt={props.selectedTactic.name}
                        class={styles.detailsImage}
                        width="150px"
                        height="150px"
                    />
                    <div class={styles.detailsInfo}>
                        <h2>{props.selectedTactic.name}</h2>
                        <p>
                            <strong>Rarity:</strong>{" "}
                            {props.selectedTactic.rarity}
                        </p>
                        {props.selectedTactic.description && (
                            <h5 style={{ "font-size": "0.9em" }}>
                                {props.selectedTactic.description}
                            </h5>
                        )}
                    </div>
                </div>
            ) : (
                <div class={styles.noSelection}>
                    <p>Select a tactic to view details</p>
                </div>
            )}
        </div>
    );
};

export default DetailsSection;
