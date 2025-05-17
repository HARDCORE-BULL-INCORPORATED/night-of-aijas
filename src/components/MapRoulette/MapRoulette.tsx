import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import CSGOCaseRoulette from "../roulette/CSGOCaseRoulette";
import type { CSGOItem } from "../roulette/types";
import { mapCase } from "./mapCase";

const MapRoulette: Component = () => {
    const [wonItems, setWonItems] = createSignal<CSGOItem[]>([]);

    const caseItems = mapCase;

    const handleItemWon = (item: CSGOItem): void => {
        setWonItems([item, ...wonItems()]);
        console.log(`Map selected: ${item.name} (${item.rarity})`);
    };

    return (
        <div class="container">
            <h1>CS:GO MAP ROULETTE</h1>
            <p>SPIN THE WHEEL AND LET THE GAME DECIDE YOUR NEXT MAP!</p>

            <CSGOCaseRoulette
                items={caseItems}
                onItemWon={handleItemWon}
                spinDuration={8}
            />

            {wonItems().length > 0 && (
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
            )}
        </div>
    );
};

export default MapRoulette;
