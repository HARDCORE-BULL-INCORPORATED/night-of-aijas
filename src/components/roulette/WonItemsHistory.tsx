// /Users/kristjan/Documents/github/äijä/src/components/roulette/WonItemsHistory.tsx
import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import type { CaseItem } from "./types";
import RouletteItem from "./RouletteItem";

export interface WonItemsHistoryProps {
	items: CaseItem[];
	title: string;
	itemWidth?: number;
}

const WonItemsHistory: Component<WonItemsHistoryProps> = (props) => {
	const width = () => props.itemWidth || 140; // Default width if not provided

	return (
		<Show when={props.items.length > 0}>
			<div style={{ margin: "20px 0" }}>
				<h2>
					{props.title} ({props.items.length})
				</h2>
				<div
					style={{
						display: "flex",
						"flex-wrap": "wrap",
						gap: "10px",
						"justify-content": "center",
						"margin-top": "15px",
					}}
				>
					<For each={props.items}>
						{(item, index) => (
							<div
								style={{
									display: "flex",
									"flex-direction": "column",
									"align-items": "center",
									width: `${width()}px`,
								}}
							>
								<span style={{ "font-size": "0.8em", opacity: "0.7" }}>
									#{index() + 1}
								</span>
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
