// /Users/kristjan/Documents/github/äijä/src/components/roulette/WonItemsHistory.tsx
import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import type { CaseItem } from "../types"; // Adjusted path
import RouletteItem from "../RouletteDisplay/RouletteItem"; // Adjusted path
import styles from "./WonItemsHistory.module.css"; // Will be created

export interface WonItemsHistoryProps {
	items: CaseItem[];
	title: string;
	itemWidth?: number;
}

const WonItemsHistory: Component<WonItemsHistoryProps> = (props) => {
	const width = () => props.itemWidth || 140; // Default width if not provided

	return (
		<Show when={props.items.length > 0}>
			<div class={styles.historyContainer}>
				<h2 class={styles.historyTitle}>
					{props.title} ({props.items.length})
				</h2>
				<div class={styles.itemsGrid}>
					<For each={props.items}>
						{(item, index) => (
							<div class={styles.historyItemContainer}>
								<span class={styles.itemIndex}>#{index() + 1}</span>
								<RouletteItem item={item} width={width()} />
							</div>
						)}
					</For>
				</div>
			</div>
		</Show>
	);
};

export default WonItemsHistory;
