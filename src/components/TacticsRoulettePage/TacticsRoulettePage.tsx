import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import CSGOCaseRoulette from "../roulette/CSGOCaseRoulette";
import type { CSGOItem } from "../roulette/types";

const TacticsRoulettePage: Component = () => {
    const [wonItems, setWonItems] = createSignal<CSGOItem[]>([]);

    // Placeholder for tactics items - you can add your tactics here later
    const caseItems: CSGOItem[] = [
        // Example placeholder item:
        // {
        // id: 1,
        // name: "Placeholder Tactic",
        // image: "/tactics/default_tactic_image.png", // Replace with an actual image path if you have one
        // rarity: "Common",
        // weight: 1,
        // },
    ];

    const handleItemWon = (item: CSGOItem): void => {
        setWonItems([item, ...wonItems()]);
        console.log(`Tactic selected: ${item.name} (${item.rarity})`);
    };

    return (
        <div class="container">
            <h1>TACTICS ROULETTE</h1>
            <p>SPIN THE WHEEL AND LET FATE DECIDE YOUR NEXT STRATEGY!</p>

            <CSGOCaseRoulette
                items={caseItems}
                onItemWon={handleItemWon}
                spinDuration={8} // You can adjust this
            // itemWidth={140} // Optional: Adjust item width if needed
            // itemsInView={5} // Optional: Adjust items in view if needed
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
