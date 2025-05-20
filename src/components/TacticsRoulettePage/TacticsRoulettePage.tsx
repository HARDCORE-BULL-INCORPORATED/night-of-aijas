import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import CaseRoulette from "../roulette/CaseRoulette";
import type { CaseItem } from "../roulette/types";
import { tacticsCase as allPossibleTactics } from "./tacticsCase"; // Renamed for clarity
// MapSelectionModal and MapWeightModal are now handled by CSGOCaseRoulette

const TacticsRoulettePage: Component = () => {
    const [wonItems, setWonItems] = createSignal<CaseItem[]>([]);
    // spinDuration is now managed by CSGOCaseRoulette internally if slider is enabled
    // const [spinDuration, setSpinDuration] = createSignal(8); // Default 8 seconds

    const handleItemWon = (item: CaseItem): void => {
        setWonItems([item, ...wonItems()]);
        console.log(`Tactic selected: ${item.name} (${item.rarity})`);
    };

    return (
        <div class="container">
            <h1>TACTICS ROULETTE</h1>
            <p>SPIN THE WHEEL AND LET FATE DECIDE YOUR NEXT STRATEGY!</p>

            {/* Add a toggle for showing result modal, similar to MapRoulette */}
            {/* You can also add toggles for map management and spin duration slider if needed */}

            <CaseRoulette
                items={allPossibleTactics} // Provide initial items
                allMaps={allPossibleTactics} // For item selection modal if enabled
                initialActiveMaps={allPossibleTactics} // Start with all tactics active if management enabled
                onItemWon={handleItemWon}
                // spinDuration is now managed internally by CSGOCaseRoulette via enableSpinDurationSlider
                // To enable item management and spin duration slider:
                enableMapManagement={true} // Set to true to enable item selection/weighting
                enableSpinDurationSlider={true} // Set to true to enable spin duration slider
                initialSpinDuration={8} // Set initial spin duration for the slider
                // showModal can be controlled similarly if a result modal toggle is added
            />

            {wonItems().length > 0 && (
                <div style={{ margin: "20px 0" }}>
                    <h2>Tactics History ({wonItems().length})</h2>
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
                                        padding: "10px",
                                        background: "rgba(0,0,0,0.3)",
                                        "border-radius": "5px",
                                        display: "flex",
                                        "flex-direction": "column",
                                        "align-items": "center",
                                        width: "120px", // Adjust as needed
                                    }}
                                >
                                    <span
                                        style={{
                                            "font-size": "0.8em",
                                            opacity: "0.7",
                                        }}
                                    >
                                        #{index() + 1}
                                    </span>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{
                                                width: "100px", // Adjust as needed
                                                height: "75px", // Adjust as needed
                                                "object-fit": "cover",
                                                "border-radius": "3px",
                                            }}
                                            loading="lazy"
                                        />
                                    )}
                                    <span
                                        style={{
                                            "margin-top": "5px",
                                            "font-size": "14px", // Adjust as needed
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TacticsRoulettePage;
