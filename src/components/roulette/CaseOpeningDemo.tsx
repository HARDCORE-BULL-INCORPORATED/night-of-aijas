import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import CSGOCaseRoulette from "../roulette/CSGOCaseRoulette";
import type { CSGOItem } from "../roulette/types";

const CaseOpeningDemo: Component = () => {
    const [wonItems, setWonItems] = createSignal<CSGOItem[]>([]);

    // Define your case items
    const caseItems: CSGOItem[] = [
      {
        id: 1,
        name: "Ancient",
        image: "/maps/de_ancient.png", 
        rarity: "rare",
        weight: 1 // Equal probability
      },
      {
        id: 2,
        name: "Dust II",
        image: "/maps/de_dust2.png",
        rarity: "common",
        weight: 1 // Equal probability
      },
      {
        id: 3,
        name: "Mirage",
        image: "/maps/de_mirage.png",
        rarity: "common",
        weight: 1 // Equal probability
      },
      {
        id: 4,
        name: "Inferno",
        image: "/maps/de_inferno.png",
        rarity: "uncommon",
        weight: 1 // Equal probability
      },
      {
        id: 5,
        name: "Train",
        image: "/maps/de_train.png",
        rarity: "legendary",
        weight: 1 // Equal probability
      },
      {
        id: 6,
        name: "Office",
        image: "/maps/cs_office.png",
        rarity: "rare",
        weight: 1 // Equal probability
      },
      {
        id: 7,
        name: "Italy",
        image: "/maps/cs_italy.png",
        rarity: "uncommon",
        weight: 1 // Equal probability
      },
      {
        id: 8,
        name: "Overpass",
        image: "/maps/de_overpass.png",
        rarity: "rare",
        weight: 1 // Equal probability
      },
      {
        id: 9,
        name: "Vertigo",
        image: "/maps/de_vertigo.png",
        rarity: "rare",
        weight: 1 // Equal probability
      },
      {
        id: 10,
        name: "Anubis",
        image: "/maps/de_anubis.png",
        rarity: "mythical",
        weight: 1 // Equal probability
      },
      {
        id: 11,
        name: "Jura",
        image: "/maps/de_jura.png",
        rarity: "legendary",
        weight: 1 // Equal probability
      },
      {
        id: 12,
        name: "Grail",
        image: "/maps/de_grail.png",
        rarity: "ancient",
        weight: 1 // Equal probability
      },
      {
        id: 13,
        name: "Nuke",
        image: "/maps/de_nuke.png",
        rarity: "uncommon",
        weight: 1 // Equal probability
      },
      {
        id: 14,
        name: "Agency",
        image: "/maps/cs_agency.png",
        rarity: "contraband",
        weight: 1 // Equal probability
      }
    ];

    // Handle when a map is won
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
                spinDuration={6}
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

export default CaseOpeningDemo;
