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
      name: "Mirage",
      image: "/maps/mirage.jpg", 
      rarity: "common",
      weight: 20 // 20% chance
    },
    {
      id: 2,
      name: "Dust II",
      image: "/maps/dust2.jpg",
      rarity: "common",
      weight: 20 // 20% chance
    },
    {
      id: 3,
      name: "Inferno",
      image: "/maps/inferno.jpg",
      rarity: "uncommon",
      weight: 15 // 15% chance
    },
    {
      id: 4,
      name: "Nuke",
      image: "/maps/nuke.jpg",
      rarity: "uncommon",
      weight: 15 // 15% chance
    },
    {
      id: 5,
      name: "Overpass",
      image: "/maps/overpass.jpg",
      rarity: "rare",
      weight: 10 // 10% chance
    },
    {
      id: 6,
      name: "Vertigo",
      image: "/maps/vertigo.jpg",
      rarity: "rare",
      weight: 10 // 10% chance
    },
    {
      id: 7,
      name: "Ancient",
      image: "/maps/ancient.jpg",
      rarity: "mythical",
      weight: 5 // 5% chance
    },
    {
      id: 8,
      name: "Train",
      image: "/maps/train.jpg",
      rarity: "legendary",
      weight: 3 // 3% chance
    },
    {
      id: 9,
      name: "Cache",
      image: "/maps/cache.jpg",
      rarity: "ancient",
      weight: 2 // 2% chance
    },
    {
      id: 10,
      name: "Office",
      image: "/maps/office.jpg",
      rarity: "contraband",
      weight: 0.5 // 0.5% chance
    }
  ];

  // Handle when a map is won
  const handleItemWon = (item: CSGOItem): void => {
    setWonItems([item, ...wonItems()]);
    console.log(`Map selected: ${item.name} (${item.rarity})`);
  };

  return (
    <div class="container">
      <h1>Map Selector</h1>
      <p>Let RNG decide what map you should play next!</p>
      
      <CSGOCaseRoulette
        items={caseItems}
        onItemWon={handleItemWon}
        spinDuration={6} 
      />
      
      {wonItems().length > 0 && (
        <div style={{ margin: "20px 0" }}>
          <h2>Map History ({wonItems().length})</h2>
          <div style={{ display: "flex", "flex-wrap": "wrap", gap: "10px", "justify-content": "center", "margin-top": "15px" }}>
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
                    width: "120px"
                  }}
              >
                <span style={{ "font-size": "0.8em", opacity: "0.7" }}>#{index() + 1}</span>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: "100px", height: "75px", "object-fit": "cover", "border-radius": "3px" }} 
                  loading="lazy"
                />
                <span style={{ "margin-top": "5px", "font-size": "14px" }}>{item.name}</span>
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