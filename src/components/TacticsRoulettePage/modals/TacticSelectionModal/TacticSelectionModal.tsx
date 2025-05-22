import type { Component } from "solid-js";
import { createSignal, For, Show, createEffect } from "solid-js";
import styles from "./TacticSelectionModal.module.css";
import type { Tactic } from "../../types";

interface TacticSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	allTactics: Tactic[];
	activeTacticNames: string[];
	onSave: (selectedTacticNames: string[]) => void;
}

const TacticSelectionModal: Component<TacticSelectionModalProps> = (props) => {
	const [selectedNames, setSelectedNames] = createSignal<string[]>([]);

	createEffect(() => {
		if (props.isOpen) {
			setSelectedNames([...props.activeTacticNames]);
		}
	});

	const handleCheckboxChange = (tacticName: string, checked: boolean) => {
		if (checked) {
			setSelectedNames([...selectedNames(), tacticName]);
		} else {
			setSelectedNames(selectedNames().filter((name) => name !== tacticName));
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
		const allTacticNames = props.allTactics.map((tactic) => tactic.name);
		setSelectedNames(allTacticNames);
	};

	const handleDeselectAll = () => {
		setSelectedNames([]);
	};

	// Adjust row slicing if needed, for now, keeps the 7-item rows
	const firstRowTactics = () => props.allTactics.slice(0, 7);
	const secondRowTactics = () => props.allTactics.slice(7, 14);

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
							Select Tactic Pool
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
						{" "}
						{/* Changed from mapRowsContainer */}
						<ul class={styles.itemListRow}>
							{" "}
							{/* Changed from mapListRow */}
							<For each={firstRowTactics()}>
								{(tactic) => (
									<li class={styles.itemListItem}>
										{" "}
										{/* Changed from mapItem */}
										<label>
											<input
												type="checkbox"
												checked={selectedNames().includes(tactic.name)}
												onChange={(e) =>
													handleCheckboxChange(
														tactic.name,
														e.currentTarget.checked,
													)
												}
											/>
											{/* Assuming Tactic type might not have an image, or a generic one */}
											{/* <img src={tactic.image} alt={tactic.name} class={styles.itemItemImage} /> */}
											<span class={styles.itemItemName}>{tactic.name}</span>
										</label>
									</li>
								)}
							</For>
						</ul>
						<Show when={secondRowTactics().length > 0}>
							<ul class={styles.itemListRow}>
								{" "}
								{/* Changed from mapListRow */}
								<For each={secondRowTactics()}>
									{(tactic) => (
										<li class={styles.itemListItem}>
											{" "}
											{/* Changed from mapItem */}
											<label>
												<input
													type="checkbox"
													checked={selectedNames().includes(tactic.name)}
													onChange={(e) =>
														handleCheckboxChange(
															tactic.name,
															e.currentTarget.checked,
														)
													}
												/>
												{/* <img src={tactic.image} alt={tactic.name} class={styles.itemItemImage} /> */}
												<span class={styles.itemItemName}>{tactic.name}</span>
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
