import type { Component } from "solid-js";
import { createSignal, For, Show } from "solid-js";
import CSGOCaseRoulette from "../roulette/CSGOCaseRoulette";
import type { CSGOItem } from "../roulette/types";
import { mapCase as allPossibleMaps } from "./mapCase";
import MapSelectionModal from "./MapSelectionModal";

const MapRoulette: Component = () => {
    const [wonItems, setWonItems] = createSignal<CSGOItem[]>([]);
    const [activeMaps, setActiveMaps] = createSignal<CSGOItem[]>([...allPossibleMaps]);
    const [isModalOpen, setIsModalOpen] = createSignal(false);

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
        const newActiveMaps = allPossibleMaps.filter(map => selectedMapIds.includes(map.id));
        setActiveMaps(newActiveMaps);
    };

    return (
        <div class="container">
            <h1>CS:GO MAP ROULETTE</h1>
            <p>SPIN THE WHEEL AND LET THE GAME DECIDE YOUR NEXT MAP!</p>

            <button
                type="button"
                onClick={handleOpenModal}
                style={{
                    "margin-bottom": "20px",
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

            <CSGOCaseRoulette
                items={activeMaps()}
                onItemWon={handleItemWon}
                spinDuration={8}
                disabled={activeMaps().length === 0}
            />

            <MapSelectionModal
                isOpen={isModalOpen()}
                onClose={handleCloseModal}
                allMaps={allPossibleMaps}
                activeMapIds={activeMaps().map(map => map.id)}
                onSave={handleSaveMapSelection}
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
                                        padding: "10px",
                                        background: "rgba(0,0,0,0.3)",
                                        "border-radius": "5px",
                                        display: "flex",
                                        "flex-direction": "column",
                                        "align-items": "center",
                                        width: "120px",
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
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: "100px",
                                            height: "75px",
                                            "object-fit": "cover",
                                            "border-radius": "3px",
                                        }}
                                        loading="lazy"
                                    />
                                    <span
                                        style={{
                                            "margin-top": "5px",
                                            "font-size": "14px",
                                        }}
                                    >
                                        {item.name}
                                    </span>
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
