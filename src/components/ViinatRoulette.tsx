import type { Component } from "solid-js";
import CaseRoulette from "./roulette/CaseRoulette";
import type { CaseItem } from "./roulette/types";
import { useRouletteState } from "../hooks/useRouletteState";
import { boozeCase } from "./ViinatRoulette/boozeCase";

const ViinatRoulette: Component = () => {
	const { activeMaps, wonItems, addWonItem, clearWonItems, setActiveMaps } =
		useRouletteState("viinatRoulette", boozeCase);

	const handleItemWon = (item: CaseItem): void => {
		addWonItem(item);
		// You can add more logic here if needed
	};

	const handleClearHistory = () => {
		clearWonItems();
	};

	const handleActiveMapsChange = (maps: CaseItem[]) => {
		setActiveMaps(maps);
	};

	return (
		<div class="container">
			<h1>SUOMI VIINAT ROULETTE</h1>
			<p>Spin the wheel and let fate decide your next Finnish booze!</p>
			<CaseRoulette
				items={activeMaps().length > 0 ? activeMaps() : [...boozeCase]}
				allMaps={[...boozeCase]}
				initialActiveMaps={activeMaps()}
				onItemWon={handleItemWon}
				onActiveMapsChange={handleActiveMapsChange}
				enableMapManagement={true}
				enableSpinDurationSlider={true}
				showWonItemsHistory={true}
				wonItems={wonItems()}
				onClearWonItemsHistory={handleClearHistory}
				historyTitle="Booze History"
				selectItemsButtonText="Select Boozes"
				itemWeightsButtonText="Booze Weights"
			/>
		</div>
	);
};

export default ViinatRoulette;
