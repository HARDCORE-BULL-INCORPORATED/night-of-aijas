import type { Component } from "solid-js";
import { createSignal, For, Show, createEffect } from "solid-js";
import type { CSGOItem } from "../roulette/types";
import styles from "./MapWeightModal.module.css";

interface MapWeightModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentMapConfigs: CSGOItem[];
    onSave: (updatedMapConfigs: CSGOItem[]) => void;
}

const MapWeightModal: Component<MapWeightModalProps> = (props) => {
    const [editableMapConfigs, setEditableMapConfigs] = createSignal<CSGOItem[]>([]);

    createEffect(() => {
        if (props.isOpen) {
            // Deep clone to prevent direct mutation of props
            setEditableMapConfigs(props.currentMapConfigs.map(map => ({ ...map })));
        }
    });

    const handleWeightChange = (mapId: string | number, newWeight: string) => {
        const weight = parseFloat(newWeight);
        if (isNaN(weight) || weight < 0) return; // Basic validation

        setEditableMapConfigs(prevConfigs =>
            prevConfigs.map(map =>
                map.id === mapId ? { ...map, weight: weight } : map
            )
        );
    };

    const handleSave = () => {
        // Ensure all maps have a valid weight; default to 1 if somehow undefined or NaN
        // This step is more of a safeguard now that CSGOItem requires weight,
        // but good for robustness if data sources were less reliable.
        const configsWithEnsuredWeights = editableMapConfigs().map(map => ({
            ...map,
            weight: (typeof map.weight !== 'number' || isNaN(map.weight) || map.weight < 0) ? 1 : map.weight,
        }));
        props.onSave(configsWithEnsuredWeights);
        props.onClose();
    };

    const handleBackdropClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    return (
        <Show when={props.isOpen}>
            <div class={styles.modalBackdrop} onClick={handleBackdropClick} role="presentation">
                <div class={styles.modalContent} role="dialog" aria-modal="true" aria-labelledby="weightModalTitle">
                    <div class={styles.modalHeader}>
                        <h2 id="weightModalTitle" class={styles.modalTitle}>Customize Map Weights</h2>
                        <button type="button" class={styles.closeButton} onClick={props.onClose} aria-label="Close">×</button>
                    </div>

                    <p class={styles.explanationText}>
                        Adjust the weights to change the likelihood of each map being selected.
                        A higher weight means a higher chance. For example, a map with weight 2 is twice as likely to be picked as a map with weight 1.
                        Weights are relative to each other.
                    </p>

                    <ul class={styles.mapWeightList}>
                        <For each={editableMapConfigs()}>
                            {(map) => (
                                <li class={styles.mapWeightItem}>
                                    <img src={map.image} alt={map.name} class={styles.mapImage} />
                                    <span class={styles.mapName}>{map.name}</span>
                                    <input
                                        type="number"
                                        value={(map.weight).toString()} // Removed ?? 1 as weight is now mandatory
                                        onInput={(e) => handleWeightChange(map.id, e.currentTarget.value)}
                                        class={styles.weightInput}
                                        min="0"
                                        step="0.1"
                                    />
                                </li>
                            )}
                        </For>
                    </ul>

                    <div class={styles.modalActions}>
                        <button type="button" class={styles.actionButton} onClick={props.onClose}>Cancel</button>
                        <button type="button" class={`${styles.actionButton} ${styles.saveButton}`} onClick={handleSave}>Save Weights</button>
                    </div>
                </div>
            </div>
        </Show>
    );
};

export default MapWeightModal;
