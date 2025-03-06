import { Component, createSignal, For, onMount } from "solid-js";
import styles from "./TacticRoulette.module.css";
import { TacticItem, tacticPool, getItemBorderClass } from "./tacticsTypes";
import { TacticRoulette } from "./roulette.classes";
import RouletteItem from "./RouletteItem";
import tacticStyles from "./TacticRoller.module.css";

const TacticRoller: Component = () => {
  const [isOpening, setIsOpening] = createSignal(false);
  const [inventory, setInventory] = createSignal<TacticItem[]>([]);
  const [selectedTactic, setSelectedTactic] = createSignal<TacticItem | null>(
    null
  );
  const [rouletteTactics, setRouletteTactics] = createSignal<TacticItem[]>([]);
  const [prizeTacticId, setPrizeTacticId] = createSignal<number>(-1);
  const [isSpinEnded, setIsSpinEnded] = createSignal(false);

  // In SolidJS, refs are just variables that get assigned during render
  let rouletteContainerRef: HTMLDivElement | undefined;
  let tacticsRef: HTMLDivElement | undefined;

  onMount(() => {
    const savedInventory = localStorage.getItem("tacticInventory");
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  });

  const saveInventory = () => {
    if (inventory().length > 0) {
      localStorage.setItem("tacticInventory", JSON.stringify(inventory()));
    }
  };

  const openCase = () => {
    setIsOpening(true);
    setIsSpinEnded(false);

    // Ensure refs are set
    if (!rouletteContainerRef || !tacticsRef) {
      console.error("Refs not properly initialized");
      setIsOpening(false);
      return;
    }

    // Get a random winner tactic using weighted selection
    const randomTactic = getWeightedRandomTactic(tacticPool);

    try {
      // Create a new roulette with the selected winner
      const roulette = new TacticRoulette({
        winner: randomTactic,
        tactics: tacticPool,
        rouletteContainerRef: rouletteContainerRef,
        tacticsRef: tacticsRef,
        tacticsCount: 100,
        transitionDuration: 5,
        itemWidth: 200,
      });

      roulette.set_tactics();
      setRouletteTactics(roulette.tactics);

      setTimeout(() => {
        const prizeId = roulette.spin();
        setPrizeTacticId(prizeId);
      }, 1000);
    } catch (error) {
      console.error("Error setting up roulette:", error);
      setIsOpening(false);
    }
  };

  const getWeightedRandomTactic = (items: TacticItem[]): TacticItem => {
    // Calculate total weight
    const totalWeight = items.reduce(
      (acc, item) => acc + (item.chance || 1),
      0
    );

    // Get a random value between 0 and total weight
    const randomValue = Math.random() * totalWeight;

    // Find the tactic based on weight distribution
    let weightSum = 0;
    for (const item of items) {
      weightSum += item.chance || 1;
      if (randomValue <= weightSum) {
        return item;
      }
    }

    // Fallback (should never reach here if weights are positive)
    return items[0];
  };

  const handleTransitionEnd = () => {
    // This needs to correctly identify the winning tactic
    const winningTactic = rouletteTactics()[prizeTacticId()];

    if (!winningTactic) {
      console.error("Winning tactic not found at index", prizeTacticId());
      return;
    }

    console.log("Prize ID:", prizeTacticId(), "Winner:", winningTactic.name);

    setIsOpening(false);
    setIsSpinEnded(true);
    setSelectedTactic(winningTactic);

    // Add to inventory
    setInventory((prev) => [winningTactic, ...prev]);
    saveInventory();
  };

  const clearInventory = () => {
    setInventory([]);
    setSelectedTactic(null);
    localStorage.removeItem("tacticInventory");
  };

  const selectTactic = (tactic: TacticItem) => {
    setSelectedTactic(tactic);
  };

  return (
    <div class={tacticStyles.container}>
      <div class={tacticStyles.wrapper}>
        <div class={tacticStyles.header}>
          <h1>Tactics</h1>
        </div>

        <div class={tacticStyles.mainContent}>
          {/* Left section with roulette */}
          <div class={tacticStyles.rollerSection}>
            {/* Roulette UI */}
            <div class={styles.rouletteWrapper}>
              <button
                onClick={openCase}
                disabled={isOpening()}
                class="cs-btn"
                style={{
                  width: "auto",
                  "align-self": "center",
                  "margin-top": "10px",
                }}
              >
                {isOpening() ? "Rolling Tactic..." : "Roll Tactic"}
              </button>

              <div
                ref={rouletteContainerRef}
                style={{ overflow: "hidden", width: "100%" }}
              >
                <div class={styles.roulette}>
                  <div class={styles.target}></div>
                  <div
                    ref={tacticsRef}
                    class={styles.tactics}
                    onTransitionEnd={handleTransitionEnd}
                  >
                    <For each={rouletteTactics()}>
                      {(tactic, i) => (
                        <RouletteItem
                          tactic={tactic}
                          isLoser={
                            i() !== prizeTacticId() &&
                            !isOpening() &&
                            isSpinEnded()
                          }
                        />
                      )}
                    </For>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory section */}
            <div class={tacticStyles.inventory}>
              <div class={tacticStyles.inventoryHeader}>
                <h2>Previous Tactics</h2>
                {inventory().length > 0 && (
                  <button
                    onClick={clearInventory}
                    class="cs-btn cs-btn-danger cs-btn-sm"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {inventory().length === 0 ? (
                <p class={tacticStyles.emptyInventory}>
                  Your inventory is empty. Roll some tactics!
                </p>
              ) : (
                <div class={tacticStyles.inventoryGrid}>
                  <For each={inventory()}>
                    {(item) => (
                      <div
                        class={`${tacticStyles.inventoryItem} ${
                          selectedTactic() === item ? tacticStyles.selected : ""
                        }`}
                        onClick={() => selectTactic(item)}
                      >
                        <div
                          class={`${
                            tacticStyles.inventoryCard
                          } ${getItemBorderClass(item.color)}`}
                        >
                          <img src={item.image} alt={item.name} />
                        </div>
                        <p class={tacticStyles.inventoryItemName}>
                          {item.name}
                        </p>
                      </div>
                    )}
                  </For>
                </div>
              )}
            </div>
          </div>

          {/* Right section with details */}
          <div class={tacticStyles.detailsSection}>
            {selectedTactic() ? (
              <div class={tacticStyles.detailsContent}>
                <img
                  src={selectedTactic()!.image}
                  alt={selectedTactic()!.name}
                  class={tacticStyles.detailsImage}
                  width="150px"
                  height="150px"
                />
                <div class={tacticStyles.detailsInfo}>
                  <h2>{selectedTactic()!.name}</h2>
                  <p>
                    <strong>Rarity:</strong> {selectedTactic()!.rarity}
                  </p>
                </div>
              </div>
            ) : (
              <div class={tacticStyles.noSelection}>
                <p>Select a tactic to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticRoller;
