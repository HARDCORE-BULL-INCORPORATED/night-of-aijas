import type { Component } from "solid-js";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { mapCase as allPossibleMapsData } from "./mapCase";
import { mapPresets } from "./mapPresets";
import { useRouletteState } from "../../hooks/useRouletteState";

const MapRoulette: Component = () => {
	const { activeMaps, wonItems, addWonItem, clearWonItems, setActiveMaps } =
		useRouletteState("mapRoulette", [...allPossibleMapsData]);

	const handleItemWon = (item: CaseItem): void => {
		addWonItem(item);
		console.log(`Map selected: ${item.name} (${item.rarity})`);
	};

	const handleClearHistory = () => {
		clearWonItems();
	};

	const handleActiveMapsChange = (maps: CaseItem[]) => {
		setActiveMaps(maps);
	};

	return (
		<div class="container">
			<h1>CS:GO MAP ROULETTE</h1>
			<p>SPIN THE WHEEL AND LET THE GAME DECIDE YOUR NEXT MAP!</p>

			<CaseRoulette
				items={
					activeMaps().length > 0 ? activeMaps() : [...allPossibleMapsData]
				}
				allMaps={[...allPossibleMapsData]}
				initialActiveMaps={activeMaps()}
				onItemWon={handleItemWon}
				onActiveMapsChange={handleActiveMapsChange}
				enableMapManagement={true}
				enableSpinDurationSlider={true}
				presets={mapPresets}
				showWonItemsHistory={true}
				wonItems={wonItems()}
				onClearWonItemsHistory={handleClearHistory}
				historyTitle="Map History"
				selectItemsButtonText="Select Maps"
				itemWeightsButtonText="Map Weights"
			/>
		</div>
	);
};

export default MapRoulette;
