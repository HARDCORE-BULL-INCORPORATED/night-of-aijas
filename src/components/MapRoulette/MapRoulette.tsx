import type { Component } from "solid-js";
import { createSignal, For, Show } from "solid-js";
import CSGOCaseRoulette from "../roulette/CSGOCaseRoulette";
import type { CSGOItem } from "../roulette/types";
import { mapCase as allPossibleMaps } from "./mapCase";
import MapSelectionModal from "./MapSelectionModal";
import MapWeightModal from "./MapWeightModal"; // Import the new modal
import RouletteItem from "../roulette/RouletteItem"; // Import RouletteItem component

const MapRoulette: Component = () => {
	const [wonItems, setWonItems] = createSignal<CSGOItem[]>([]);
	const [activeMaps, setActiveMaps] = createSignal<CSGOItem[]>([
		...allPossibleMaps,
	]);
	const [isModalOpen, setIsModalOpen] = createSignal(false);
	const [isWeightModalOpen, setIsWeightModalOpen] = createSignal(false); // State for the new modal
	const [spinDuration, setSpinDuration] = createSignal(8); // Default 8 seconds

	const handleItemWon = (item: CSGOItem): void => {
		setWonItems([item, ...wonItems()]);
		console.log(`Map selected: ${item.name} (${item.rarity})`);
	};

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSaveMapSelection = (selectedMapIds: (string | number)[]) => {
		const newActiveMaps = allPossibleMaps.filter((map) =>
			selectedMapIds.includes(map.id),
		);
		// Preserve existing weights when selection changes, or reset if that's preferred.
		// For now, let's find the original weight from allPossibleMaps for newly selected maps.
		// Or, better, ensure that mapCase items have default weights and they are carried over.
		// The current approach will use weights from allPossibleMaps for newly filtered maps.
		setActiveMaps(newActiveMaps);
	};

	// Handlers for the weight modal
	const handleOpenWeightModal = () => {
		setIsWeightModalOpen(true);
	};

	const handleCloseWeightModal = () => {
		setIsWeightModalOpen(false);
	};

	const handleSaveMapWeights = (updatedMapConfigs: CSGOItem[]) => {
		// The updatedMapConfigs from MapWeightModal already contains all active maps with their new weights.
		// We need to ensure that this update also respects the current filter of active maps.
		// A simple setActiveMaps should work if MapWeightModal only receives and returns currently active maps.
		setActiveMaps(updatedMapConfigs);
		// No need to call handleCloseWeightModal here as it's called inside MapWeightModal on save
	};

	return (
		<div class="container">
			<h1>CS:GO MAP ROULETTE</h1>
			<p>SPIN THE WHEEL AND LET THE GAME DECIDE YOUR NEXT MAP!</p>

			<div
				style={{
					display: "flex",
					gap: "10px",
					"margin-bottom": "20px",
					"justify-content": "center",
				}}
			>
				{/* Wrapper for buttons, added justify-content */}
				<button
					type="button"
					onClick={handleOpenModal}
					style={{
						padding: "10px 15px",
						"background-color": "#4A5568",
						color: "white",
						border: "none",
						"border-radius": "4px",
						cursor: "pointer",
						"font-size": "14px",
					}}
				>
					Customize Map Pool
				</button>
				<button // Button to open the weight modal
					type="button"
					onClick={handleOpenWeightModal}
					style={{
						padding: "10px 15px",
						"background-color": "#4A5568", // Same style for now, can be changed
						color: "white",
						border: "none",
						"border-radius": "4px",
						cursor: "pointer",
						"font-size": "14px",
					}}
					disabled={activeMaps().length === 0} // Disable if no maps are active
				>
					Customize Map Weights
				</button>
			</div>

			{/* Roll duration slider */}
			<div
				style={{
					display: "flex",
					"align-items": "center",
					"justify-content": "center",
					gap: "10px",
					"margin-bottom": "20px",
				}}
			>
				<label
					for="spinDurationSlider"
					style={{ color: "#fff", "font-size": "14px" }}
				>
					Roll Duration:
				</label>
				<input
					id="spinDurationSlider"
					type="range"
					min="1"
					max="60"
					step="0.5"
					value={spinDuration()}
					onInput={(e) => setSpinDuration(Number(e.currentTarget.value))}
					style={{ width: "150px" }}
				/>
				<span
					style={{
						color: "#fff",
						"font-size": "14px",
						width: "60px",
						display: "inline-block",
					}}
				>
					{spinDuration().toFixed(1)}s
				</span>
			</div>

			<CSGOCaseRoulette
				items={activeMaps()}
				onItemWon={handleItemWon}
				spinDuration={spinDuration()}
				disabled={activeMaps().length === 0}
			/>

			<MapSelectionModal
				isOpen={isModalOpen()}
				onClose={handleCloseModal}
				allMaps={allPossibleMaps}
				activeMapIds={activeMaps().map((map) => map.id)}
				onSave={handleSaveMapSelection}
			/>

			{/* Render the MapWeightModal */}
			<MapWeightModal
				isOpen={isWeightModalOpen()}
				onClose={handleCloseWeightModal}
				currentMapConfigs={activeMaps()} // Pass activeMaps, as modal should only edit weights of active maps
				onSave={handleSaveMapWeights}
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
