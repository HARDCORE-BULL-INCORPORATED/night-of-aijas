import type { Component } from "solid-js";
import { createSignal, For, Show, createEffect } from "solid-js";
import styles from "./TacticSelectionModal.module.css";
import type { CaseItem } from "../../../roulette/types"; // Import CaseItem for map structure

interface TacticSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	allMaps: CaseItem[]; // Changed to use CaseItem for maps
	activeMapNames: string[]; // Changed to reflect map names
	onSave: (selectedMapNames: string[]) => void; // Changed to reflect map names
}

const TacticSelectionModal: Component<TacticSelectionModalProps> = (props) => {
	const [selectedNames, setSelectedNames] = createSignal<string[]>([]);

	createEffect(() => {
		if (props.isOpen) {
			setSelectedNames([...props.activeMapNames]);
		}
	});

	const handleCheckboxChange = (mapName: string, checked: boolean) => {
		if (checked) {
			setSelectedNames([...selectedNames(), mapName]);
		} else {
			setSelectedNames(selectedNames().filter((name) => name !== mapName));
		}
	};

	const handleSave = () => {
		props.onSave(selectedNames());
		props.onClose();
	};

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			props.onClose();
		}
	};

	const handleSelectAll = () => {
		const allMapNames = props.allMaps.map((map) => map.name);
		setSelectedNames(allMapNames);
	};

	const handleDeselectAll = () => {
		setSelectedNames([]);
	};

	// Adjust row slicing if needed, for now, keeps the 7-item rows
	const firstRowMaps = () => props.allMaps.slice(0, 7);
	const secondRowMaps = () => props.allMaps.slice(7, 14);

	return (
		<Show when={props.isOpen}>
			<div
				class={styles.modalBackdrop}
				onClick={handleBackdropClick}
				onKeyUp={(e) => {
					if (
						e.target === e.currentTarget &&
						(e.key === "Enter" || e.key === " ")
					) {
						props.onClose();
					}
				}}
				role="presentation"
			>
				<dialog
					class={styles.modalContent}
					aria-modal="true"
					aria-labelledby="modalTitle"
				>
					<div class={styles.modalHeader}>
						<h2 id="modalTitle" class={styles.modalTitle}>
							Select Map Pool for Tactics
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

					<div class={styles.itemRowsContainer}>
						<ul class={styles.itemListRow}>
							<For each={firstRowMaps()}>
								{(map) => (
									<li class={styles.itemListItem}>
										<label>
											<input
												type="checkbox"
												checked={selectedNames().includes(map.name)}
												onChange={(e) =>
													handleCheckboxChange(
														map.name,
														e.currentTarget.checked,
													)
												}
											/>
											{/* Display map image */}
											<img
												src={map.image}
												alt={map.name}
												class={styles.itemItemImage}
											/>
											<span class={styles.itemItemName}>{map.name}</span>
										</label>
									</li>
								)}
							</For>
						</ul>
						<Show when={secondRowMaps().length > 0}>
							<ul class={styles.itemListRow}>
								<For each={secondRowMaps()}>
									{(map) => (
										<li class={styles.itemListItem}>
											<label>
												<input
													type="checkbox"
													checked={selectedNames().includes(map.name)}
													onChange={(e) =>
														handleCheckboxChange(
															map.name,
															e.currentTarget.checked,
														)
													}
												/>
												{/* Display map image */}
												<img
													src={map.image}
													alt={map.name}
													class={styles.itemItemImage}
												/>
												<span class={styles.itemItemName}>{map.name}</span>
											</label>
										</li>
									)}
								</For>
							</ul>
						</Show>
					</div>

					<div class={styles.modalActions}>
						<button
							type="button"
							class={`${styles.actionButton} ${styles.secondaryButton}`}
							onClick={handleDeselectAll}
						>
							Deselect All
						</button>
						<button
							type="button"
							class={`${styles.actionButton} ${styles.secondaryButton}`}
							onClick={handleSelectAll}
						>
							Select All
						</button>
						<button
							type="button"
							class={`${styles.actionButton} ${styles.cancelButton}`}
							onClick={props.onClose}
						>
							Cancel
						</button>
						<button
							type="button"
							class={`${styles.actionButton} ${styles.saveButton}`}
							onClick={handleSave}
						>
							Save Changes
						</button>
					</div>
				</dialog>
			</div>
		</Show>
	);
};

export default TacticSelectionModal;
