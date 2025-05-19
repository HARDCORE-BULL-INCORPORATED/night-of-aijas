import type { Component } from "solid-js";
import { Show } from "solid-js";
import { type CSGOItem, getItemColor } from "./types";
import styles from "./CSGOCaseRoulette.module.css";

interface ResultModalProps {
	isOpen: boolean;
	onClose: () => void;
	item: CSGOItem | null;
}

const ResultModal: Component<ResultModalProps> = (props) => {
	const handleBackdropClick = (e: Event) => {
		if ((e.target as HTMLElement) === (e.currentTarget as HTMLElement)) {
			props.onClose();
		}
	};

	return (
		<Show when={props.isOpen && props.item}>
			<div
				class={styles.modalBackdrop}
				onClick={(e) => handleBackdropClick(e)}
				onKeyDown={(e) => {
					if ((e as KeyboardEvent).key === "Escape") props.onClose();
				}}
				role="presentation"
			>
				<div class={styles.modalContent}>
					<button
						class={styles.closeButton}
						onClick={() => props.onClose()}
						aria-label="Close"
						type="button"
					>
						×
					</button>

					<h2 class={styles.resultTitle}>You Won!</h2>

					<div class={styles.resultItem}>
						<img
							src={props.item?.image}
							alt={props.item?.name}
							class={styles.resultImage}
						/>
						<h3
							class={styles.resultName}
							style={{
								color: props.item ? getItemColor(props.item) : undefined,
							}}
						>
							{props.item?.name}
						</h3>
						<p
							class={styles.resultRarity}
							style={{
								color: props.item ? getItemColor(props.item) : undefined,
							}}
						>
							{props.item?.rarity}
						</p>
					</div>
				</div>
			</div>
		</Show>
	);
};

export default ResultModal;
