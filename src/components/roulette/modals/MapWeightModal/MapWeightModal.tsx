import type { Component } from "solid-js";
import { For, Show, createEffect, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import styles from "./MapWeightModal.module.css";
import type { CaseItem } from "../../types";

interface MapWeightModalProps {
	isOpen: boolean;
	onClose: () => void;
	currentMapConfigs: CaseItem[];
	onSave: (updatedMapConfigs: CaseItem[]) => void;
}

const MapWeightModal: Component<MapWeightModalProps> = (props) => {
	const [editableMapConfigs, setEditableMapConfigs] = createStore<CaseItem[]>(
		[],
	);

	createEffect(() => {
		if (props.isOpen) {
			setEditableMapConfigs(props.currentMapConfigs.map((map) => ({ ...map })));
		}
	});

	const totalWeight = createMemo(() => {
		return editableMapConfigs.reduce((sum, map) => sum + (map.weight || 0), 0);
	});

	const handleWeightChange = (mapId: string | number, newWeight: string) => {
		if (newWeight === "") {
			setEditableMapConfigs((map) => map.id === mapId, "weight", 0);
			return;
		}

		const weightValue = Number.parseFloat(newWeight);

		if (Number.isNaN(weightValue) || weightValue < 0) {
			return;
		}

		setEditableMapConfigs((map) => map.id === mapId, "weight", weightValue);
	};

	const handleSave = () => {
		const configsWithEnsuredWeights = editableMapConfigs.map((map) => ({
			...map,
			weight:
				typeof map.weight !== "number" ||
				Number.isNaN(map.weight) ||
				map.weight < 0
					? 1
					: map.weight,
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
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				class={styles.modalBackdrop}
				onClick={handleBackdropClick}
				role="presentation"
			>
				<dialog
					class={styles.modalContent}
					aria-modal="true"
					aria-labelledby="weightModalTitle"
				>
					<div class={styles.modalHeader}>
						<h2 id="weightModalTitle" class={styles.modalTitle}>
							Customize Map Weights
						</h2>
						<button
							type="button"
							class={styles.closeButton}
							onClick={props.onClose}
							aria-label="Close"
						>
							×
						</button>
					</div>

					<p class={styles.explanationText}>
						Adjust the weights to change the likelihood of each map being
						selected. A higher weight means a higher chance. For example, a map
						with weight 2 is twice as likely to be picked as a map with weight
						1. Weights are relative to each other.
					</p>

					<ul class={styles.mapWeightList}>
						<For each={editableMapConfigs}>
							{(map) => {
								const probability = createMemo(() => {
									const currentTotalWeight = totalWeight();
									return currentTotalWeight > 0
										? ((map.weight || 0) / currentTotalWeight) * 100
										: 0;
								});

								return (
									<li class={styles.mapWeightItem}>
										<img
											src={map.image}
											alt={map.name}
											class={styles.mapImage}
										/>
										<span class={styles.mapName}>{map.name}</span>
										<input
											type="number"
											value={map.weight.toString()}
											onInput={(e) =>
												handleWeightChange(map.id, e.currentTarget.value)
											}
											class={styles.weightInput}
											min="0"
										/>
										<span class={styles.mapProbability}>
											({probability().toFixed(1)}%)
										</span>
									</li>
								);
							}}
						</For>
					</ul>

					<div class={styles.modalActions}>
						<button
							type="button"
							class={styles.actionButton}
							onClick={props.onClose}
						>
							Cancel
						</button>
						<button
							type="button"
							class={`${styles.actionButton} ${styles.saveButton}`}
							onClick={handleSave}
						>
							Save Weights
						</button>
					</div>
				</dialog>
			</div>
		</Show>
	);
};

export default MapWeightModal;
