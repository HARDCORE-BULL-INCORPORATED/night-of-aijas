import type { Component } from "solid-js";
import { createSignal, For, Show } from "solid-js";
import CSGOCaseRoulette from "../roulette/CSGOCaseRoulette";
import type { CaseItem } from "../roulette/types";
import { mapCase as allPossibleMapsData } from "./mapCase";
import RouletteItem from "../roulette/RouletteItem";

const MapRoulette: Component = () => {
	const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);
	const [showResultModalToggle, setShowResultModalToggle] = createSignal(true); // Renamed for clarity

	const handleItemWon = (item: CaseItem): void => {
		setWonItems([item, ...wonItems()]);
		console.log(`Map selected: ${item.name} (${item.rarity})`);
	};

	return (
		<div class="container">
			<h1>CS:GO MAP ROULETTE</h1>
			<p>SPIN THE WHEEL AND LET THE GAME DECIDE YOUR NEXT MAP!</p>

			<label>
				<input
					type="checkbox"
					checked={showResultModalToggle()}
					onInput={(e) => setShowResultModalToggle(e.currentTarget.checked)}
				/>
				<span
					style={{
						"margin-left": "10px",
					}}
				>
					Show result modal
				</span>
			</label>

			<CSGOCaseRoulette
				items={allPossibleMapsData} // Provide initial items, CSGOCaseRoulette will manage activeMaps from this if enabled
				allMaps={allPossibleMapsData}
				initialActiveMaps={allPossibleMapsData} // Start with all maps active
				onItemWon={handleItemWon}
				showModal={showResultModalToggle() ? undefined : false}
				enableMapManagement={true} // Enable map selection and weight modals
				enableSpinDurationSlider={true} // Enable the internal spin duration slider
				initialSpinDuration={8} // Set initial spin duration for the slider
			/>

			<Show when={wonItems().length > 0}>
				<div style={{ margin: "20px 0" }}>
					<h2>Map History ({wonItems().length})</h2>
					<div
						style={{
							display: "flex",
							"flex-wrap": "wrap",
							gap: "10px",
							"justify-content": "center",
							"margin-top": "15px",
						}}
					>
						<For each={wonItems()}>
							{(item, index) => (
								<div
									style={{
										display: "flex",
										"flex-direction": "column",
										"align-items": "center",
										width: "140px",
									}}
								>
									<span style={{ "font-size": "0.8em", opacity: "0.7" }}>
										#{index() + 1}
									</span>
									<RouletteItem item={item} width={140} />
								</div>
							)}
						</For>
					</div>
				</div>
			</Show>
		</div>
	);
};

export default MapRoulette;
