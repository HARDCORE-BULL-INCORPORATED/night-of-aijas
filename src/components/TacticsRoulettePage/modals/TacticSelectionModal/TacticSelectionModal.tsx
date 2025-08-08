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
	const handleMapButtonClick = (mapName: string) => {
		props.onSave([mapName]); // Save the single selected map
		props.onClose(); // Close the modal
	};

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			props.onClose();
		}
	};

	// Dynamic row generation - creates rows of 7 items each
	const mapRows = () => {
		const rows: CaseItem[][] = [];
		const itemsPerRow = 7;
		
		for (let i = 0; i < props.allMaps.length; i += itemsPerRow) {
			rows.push(props.allMaps.slice(i, i + itemsPerRow));
		}
		
		return rows;
	};

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
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					{...({ closedby: "none" } as any)}
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
						<For each={mapRows()}>
							{(row) => (
								<ul class={styles.itemListRow}>
									<For each={row}>
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
							)}
						</For>
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
							All Tactics
						</button>
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
