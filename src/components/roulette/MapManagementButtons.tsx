import { type Component, createSignal, Show } from "solid-js";
import type { CaseItem, RoulettePreset } from "./types";
import MapSelectionModal from "./MapSelectionModal/MapSelectionModal";
import MapWeightModal from "./MapWeightModal/MapWeightModal";
import PresetSelectionModal from "./PresetSelectionModal/PresetSelectionModal";

interface MapManagementButtonsProps {
	enableMapManagement?: boolean;
	presets?: RoulettePreset[];
	activeMaps: CaseItem[];
	allPossibleMaps: CaseItem[];
	onActiveMapsChange: (maps: CaseItem[]) => void;
	onPresetSelect: (preset: RoulettePreset) => void;
}

const MapManagementButtons: Component<MapManagementButtonsProps> = (props) => {
	const [isMapSelectionModalOpen, setIsMapSelectionModalOpen] =
		createSignal(false);
	const [isMapWeightModalOpen, setIsMapWeightModalOpen] = createSignal(false);
	const [isPresetSelectionModalOpen, setIsPresetSelectionModalOpen] =
		createSignal(false);

	// Handlers for MapSelectionModal
	const handleOpenMapSelectionModal = () => setIsMapSelectionModalOpen(true);
	const handleCloseMapSelectionModal = () => setIsMapSelectionModalOpen(false);
	const handleSaveMapSelection = (selectedMapIds: (string | number)[]) => {
		const newActiveMaps = props.allPossibleMaps.filter((map) =>
			selectedMapIds.includes(map.id),
		);
		props.onActiveMapsChange(newActiveMaps);
		setIsMapSelectionModalOpen(false); // Close modal after saving
	};

	// Handlers for MapWeightModal
	const handleOpenMapWeightModal = () => setIsMapWeightModalOpen(true);
	const handleCloseMapWeightModal = () => setIsMapWeightModalOpen(false);
	const handleSaveMapWeights = (updatedMapConfigs: CaseItem[]) => {
		props.onActiveMapsChange(updatedMapConfigs);
		setIsMapWeightModalOpen(false); // Close modal after saving
	};

	// Handlers for PresetSelectionModal
	const handleOpenPresetSelectionModal = () =>
		setIsPresetSelectionModalOpen(true);
	const handleClosePresetSelectionModal = () =>
		setIsPresetSelectionModalOpen(false);
	const handlePresetSelected = (preset: RoulettePreset) => {
		props.onPresetSelect(preset);
		setIsPresetSelectionModalOpen(false);
	};

	return (
		<Show when={props.enableMapManagement}>
			<div
				style={{
					display: "flex",
					"margin-bottom": "10px",
					"justify-content": "center",
					"flex-wrap": "wrap",
					gap: "5px",
				}}
			>
				<button
					type="button"
					onClick={handleOpenMapSelectionModal}
					class="cs-btn"
					style={{ "font-size": "14px", padding: "10px 15px", margin: "0" }}
				>
					Select Items
				</button>
				<button
					type="button"
					onClick={handleOpenMapWeightModal}
					class="cs-btn"
					style={{ "font-size": "14px", padding: "10px 15px", margin: "0" }}
					disabled={props.activeMaps.length === 0}
				>
					Item Weights
				</button>
				<Show when={props.presets && props.presets.length > 0}>
					<button
						type="button"
						onClick={handleOpenPresetSelectionModal}
						class="cs-btn"
						style={{ "font-size": "14px", padding: "10px 15px", margin: "0" }}
					>
						Select Preset
					</button>
				</Show>
			</div>

			<MapSelectionModal
				isOpen={isMapSelectionModalOpen()}
				onClose={handleCloseMapSelectionModal}
				allMaps={props.allPossibleMaps}
				activeMapIds={props.activeMaps.map((map) => map.id)}
				onSave={handleSaveMapSelection}
			/>

			<MapWeightModal
				isOpen={isMapWeightModalOpen()}
				onClose={handleCloseMapWeightModal}
				currentMapConfigs={props.activeMaps}
				onSave={handleSaveMapWeights}
			/>

			<Show when={props.presets && props.presets.length > 0}>
				<PresetSelectionModal
					isOpen={isPresetSelectionModalOpen()}
					onClose={handleClosePresetSelectionModal}
					presets={props.presets || []}
					onPresetSelect={handlePresetSelected}
				/>
			</Show>
		</Show>
	);
};

export default MapManagementButtons;
