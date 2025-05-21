import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { mapCase as allPossibleMapsData } from "./mapCase";
import WonItemsHistory from "../roulette/WonItemsHistory";

const MapRoulette: Component = () => {
	const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);
	const [showResultModalToggle, setShowResultModalToggle] = createSignal(true); 

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

			<CaseRoulette
				items={allPossibleMapsData} // Provide initial items, CSGOCaseRoulette will manage activeMaps from this if enabled
				allMaps={allPossibleMapsData}
				initialActiveMaps={allPossibleMapsData} // Start with all maps active
				onItemWon={handleItemWon}
				showModal={showResultModalToggle() ? undefined : false}
				enableMapManagement={true} // Enable map selection and weight modals
				enableSpinDurationSlider={true} // Enable the internal spin duration slider
				initialSpinDuration={8} // Set initial spin duration for the slider
			/>

			<WonItemsHistory items={wonItems()} title="Map History" />
		</div>
	);
};

export default MapRoulette;
