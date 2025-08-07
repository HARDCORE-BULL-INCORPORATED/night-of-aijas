/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import styles from "./TacticSelectionModal.module.css";
import type { CaseItem } from "../../../roulette/types";

interface TacticSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	allMaps: CaseItem[];
	activeMapNames: string[]; // This prop is kept in the interface but not used for selection state anymore
	onSave: (selectedMapNames: string[]) => void;
}

const TacticSelectionModal: Component<TacticSelectionModalProps> = (props) => {
	// selectedNames state and related handlers (handleCheckboxChange, handleSelectAll, handleDeselectAll, createEffect) are removed.

	const handleMapButtonClick = (mapName: string) => {
		props.onSave([mapName]); // Save the single selected map
		props.onClose(); // Close the modal
	};

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			props.onClose();
		}
	};

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
							Select Map for Tactics
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
										<button
											type="button"
											class={styles.mapButton}
											onClick={() => handleMapButtonClick(map.name)}
										>
											<img
												src={map.image}
												alt={map.name}
												class={styles.itemItemImage}
											/>
											<span class={styles.itemItemName}>{map.name}</span>
										</button>
									</li>
								)}
							</For>
						</ul>
						<Show when={secondRowMaps().length > 0}>
							<ul class={styles.itemListRow}>
								<For each={secondRowMaps()}>
									{(map) => (
										<li class={styles.itemListItem}>
											<button
												type="button"
												class={styles.mapButton}
												onClick={() => handleMapButtonClick(map.name)}
											>
												<img
													src={map.image}
													alt={map.name}
													class={styles.itemItemImage}
												/>
												<span class={styles.itemItemName}>{map.name}</span>
											</button>
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
							onClick={() => {
								props.onSave([]); // Pass empty array to signify all tactics
								props.onClose();
							}}
						>
							Show All Tactics
						</button>
						{/* "Deselect All", "Select All", and "Save Changes" buttons are removed */}
						<button
							type="button"
							class={`${styles.actionButton} ${styles.cancelButton}`}
							onClick={props.onClose}
						>
							Cancel
						</button>
					</div>
				</dialog>
			</div>
		</Show>
	);
};

export default TacticSelectionModal;
