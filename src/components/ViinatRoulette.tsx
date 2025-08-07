import type { Component } from "solid-js";
import CaseRoulette from "./roulette/CaseRoulette";
import type { CaseItem } from "./roulette/types";
import { useRouletteState } from "../hooks/useRouletteState";

// Placeholder Finnish booze list
export const boozeCase: CaseItem[] = [
	{
		name: "Koskenkorva Vodka 60% muovipullo",
		rarity: "Rare Special Item",
		weight: 1,
		image: "/viinat/kossu-60.jpg",
		description:
			"https://www.alko.fi/tuotteet/946328/Koskenkorva-Vodka-60-muovipullo/",
	},
	{
		name: "Tapio",
		rarity: "Classified",
		weight: 1,
		image: "viinat/tapio-39.jpg",
		description: "https://www.alko.fi/tuotteet/104527/",
	},
	{
		name: "Sisuviina",
		rarity: "Mil-spec",
		weight: 1,
		image: "viinat/sisuviina.jpg",
		description: "",
	},
	{
		name: "Suomi Viina",
		rarity: "Mil-spec",
		weight: 1,
		image: "viinat/suomi-viina.jpg",
		description: "",
	},
	{
		name: "Saunalahden Viina",
		rarity: "Consumer",
		weight: 1,
		image: "viinat/saunalahden-viina.jpg",
		description: "",
	},
	{
		name: "Koskenkorva",
		rarity: "Restricted",
		weight: 1,
		image: "viinat/kossu.jpg",
		description: "",
	},
	{
		name: "Leijona",
		rarity: "Restricted",
		weight: 1,
		image: "viinat/leijona.jpg",
		description: "",
	},
	{
		name: "Tasavalta",
		rarity: "Mil-spec",
		weight: 1,
		image: "viinat/tasavalta.jpg",
		description: "",
	},
	{
		name: "Lithuanian Vodka Classic",
		rarity: "Contraband",
		weight: 1,
		image: "viinat/lithuanian-vodka-classic.jpg",
		description: "",
	},
	{
		name: "Kaatoryyppy",
		rarity: "Restricted",
		weight: 1,
		image: "viinat/kaatoryyppy.jpg",
		description: "",
	},
	{
		name: "Törni Viina",
		rarity: "Restricted",
		weight: 1,
		image: "viinat/torni-viina.jpg",
		description: "",
	},
];

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
