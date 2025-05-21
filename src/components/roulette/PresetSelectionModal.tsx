import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import type { RoulettePreset } from "./types";
import styles from "./PresetSelectionModal.module.css"; // Will create this CSS module next

interface PresetSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	presets: RoulettePreset[];
	onPresetSelect: (preset: RoulettePreset) => void;
}

const PresetSelectionModal: Component<PresetSelectionModalProps> = (props) => {
	const handleSelect = (preset: RoulettePreset) => {
		props.onPresetSelect(preset);
		props.onClose(); // Close modal after selection
	};

	return (
		<Show when={props.isOpen}>
			<div class={styles.modalOverlay}>
				<div class={styles.modalContent}>
					<h2>Select a Preset</h2>
					<div class={styles.presetList}>
						<For each={props.presets}>
							{(preset) => (
								<button
									type="button"
									class={styles.presetButton}
									onClick={() => handleSelect(preset)}
								>
									{preset.name}
								</button>
							)}
						</For>
					</div>
					<button
						type="button"
						class={styles.closeButton}
						onClick={props.onClose}
					>
						Close
					</button>
				</div>
			</div>
		</Show>
	);
};

export default PresetSelectionModal;
