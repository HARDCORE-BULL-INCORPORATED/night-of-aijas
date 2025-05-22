import type { Component } from "solid-js";
import { createSignal, For, Show, createEffect } from "solid-js";
import styles from "./MapSelectionModal.module.css";
import type { CaseItem } from "../../types";

interface MapSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	allMaps: CaseItem[];
	activeMapIds: string[]; // Changed from (string | number)[] to string[]
	onSave: (selectedMapNames: string[]) => void; // Changed parameter name and type
}

const MapSelectionModal: Component<MapSelectionModalProps> = (props) => {
	const [selectedNames, setSelectedNames] = createSignal<string[]>([]); // Changed from selectedIds

	// Initialize selectedNames when the modal opens or activeMapIds change
	createEffect(() => {
		if (props.isOpen) {
			setSelectedNames([...props.activeMapIds]); // Now expects string[]
		}
	});

	const handleCheckboxChange = (mapName: string, checked: boolean) => {
		// Changed mapId to mapName
		if (checked) {
			setSelectedNames([...selectedNames(), mapName]);
		} else {
			setSelectedNames(selectedNames().filter((name) => name !== mapName));
		}
	};

	const handleSave = () => {
		props.onSave(selectedNames()); // Passes string[]
		props.onClose();
	};

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			props.onClose();
		}
	};

	const handleSelectAll = () => {
		const allMapNames = props.allMaps.map((map) => map.name); // Changed to map.name
		setSelectedNames(allMapNames);
	};

	const handleDeselectAll = () => {
		setSelectedNames([]);
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
												checked={selectedNames().includes(map.name)} // Changed to map.name
												onChange={
													(e) =>
														handleCheckboxChange(
															map.name,
															e.currentTarget.checked,
														) // Changed to map.name
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
													checked={selectedNames().includes(map.name)} // Changed to map.name
													onChange={
														(e) =>
															handleCheckboxChange(
																map.name,
																e.currentTarget.checked,
															) // Changed to map.name
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
