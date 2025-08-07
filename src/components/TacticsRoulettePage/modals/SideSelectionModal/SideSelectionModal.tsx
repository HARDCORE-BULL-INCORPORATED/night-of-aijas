/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import type { Component } from "solid-js";
import { Show } from "solid-js";
import styles from "./SideSelectionModal.module.css";
import type { Side } from "../../types"; // Assuming Side type is defined in ../../types

interface SideSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectSide: (side: Side) => void;
}

const SideSelectionModal: Component<SideSelectionModalProps> = (props) => {
	const handleSideSelect = (side: Side) => {
		props.onSelectSide(side);
		props.onClose();
	};

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			props.onClose();
		}
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
					open={props.isOpen}
					aria-modal="true"
					aria-labelledby="sideModalTitle"
				>
					<div class={styles.modalHeader}>
						<h2 id="sideModalTitle" class={styles.modalTitle}>
							Select Side
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

					<div class={styles.sideButtonsContainer}>
						<button
							type="button"
							class={`cs-btn ${styles.sideButton}`}
							onClick={() => handleSideSelect("CT")}
						>
							Counter-Terrorist
						</button>
						<button
							type="button"
							class={`cs-btn ${styles.sideButton}`}
							onClick={() => handleSideSelect("T")}
						>
							Terrorist
						</button>
						<button
							type="button"
							class={`cs-btn ${styles.sideButton}`}
							onClick={() => handleSideSelect("Both")}
						>
							Both Sides
						</button>
					</div>
				</dialog>
			</div>
		</Show>
	);
};

export default SideSelectionModal;
