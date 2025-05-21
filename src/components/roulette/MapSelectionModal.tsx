import type { Component } from "solid-js";
import { createSignal, For, Show, createEffect } from "solid-js";
import type { CaseItem } from "../roulette/types";
import styles from "./MapSelectionModal.module.css";

interface MapSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	allMaps: CaseItem[];
	activeMapIds: (string | number)[];
	onSave: (selectedMapIds: (string | number)[]) => void;
}

const MapSelectionModal: Component<MapSelectionModalProps> = (props) => {
	const [selectedIds, setSelectedIds] = createSignal<(string | number)[]>([]);

	// Initialize selectedIds when the modal opens or activeMapIds change
	createEffect(() => {
		if (props.isOpen) {
			setSelectedIds([...props.activeMapIds]);
		}
	});

	const handleCheckboxChange = (mapId: string | number, checked: boolean) => {
		if (checked) {
			setSelectedIds([...selectedIds(), mapId]);
		} else {
			setSelectedIds(selectedIds().filter((id) => id !== mapId));
		}
	};

	const handleSave = () => {
		props.onSave(selectedIds());
		props.onClose();
	};

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			props.onClose();
		}
	};

	const handleSelectAll = () => {
		const allMapIds = props.allMaps.map((map) => map.id);
		setSelectedIds(allMapIds);
	};

	const handleDeselectAll = () => {
		setSelectedIds([]);
	};

	const firstRowMaps = () => props.allMaps.slice(0, 7);
	const secondRowMaps = () => props.allMaps.slice(7, 14);

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
					aria-labelledby="modalTitle"
				>
					<div class={styles.modalHeader}>
						<h2 id="modalTitle" class={styles.modalTitle}>
							Select Map Pool
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

					<div class={styles.mapRowsContainer}>
						<ul class={styles.mapListRow}>
							<For each={firstRowMaps()}>
								{(map) => (
									<li class={styles.mapItem}>
										<label>
											<input
												type="checkbox"
												checked={selectedIds().includes(map.id)}
												onChange={(e) =>
													handleCheckboxChange(map.id, e.currentTarget.checked)
												}
											/>
											<img
												src={map.image}
												alt={map.name}
												class={styles.mapItemImage}
											/>
											<span class={styles.mapItemName}>{map.name}</span>
										</label>
									</li>
								)}
							</For>
						</ul>
						<Show when={secondRowMaps().length > 0}>
							<ul class={styles.mapListRow}>
								<For each={secondRowMaps()}>
									{(map) => (
										<li class={styles.mapItem}>
											<label>
												<input
													type="checkbox"
													checked={selectedIds().includes(map.id)}
													onChange={(e) =>
														handleCheckboxChange(
															map.id,
															e.currentTarget.checked,
														)
													}
												/>
												<img
													src={map.image}
													alt={map.name}
													class={styles.mapItemImage}
												/>
												<span class={styles.mapItemName}>{map.name}</span>
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

export default MapSelectionModal;
