import { Component, createSignal, createEffect } from "solid-js";
import styles from "./TacticRoller.module.css";
import RollerSection from "./RollerSection";
import DetailsSection from "./DetailsSection";
import { TacticItem, tacticPool } from "./tacticsTypes";

const TacticRoller: Component = () => {
  const [isOpening, setIsOpening] = createSignal(false);
  const [obtainedItem, setObtainedItem] = createSignal<TacticItem | null>(null);
  const [inventory, setInventory] = createSignal<TacticItem[]>([]);
  const [selectedTactic, setSelectedTactic] = createSignal<TacticItem | null>(
    null
  );

  createEffect(() => {
    const savedInventory = localStorage.getItem("tacticInventory");
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
  });

  createEffect(() => {
    if (inventory().length > 0) {
      localStorage.setItem("tacticInventory", JSON.stringify(inventory()));
    }
  });

  const openCase = () => {
    setIsOpening(true);
    setObtainedItem(null);

    setTimeout(() => {
      const randomItem =
        tacticPool[Math.floor(Math.random() * tacticPool.length)];
      setObtainedItem(randomItem);
      setIsOpening(false);
      setSelectedTactic(randomItem);

      setInventory((prev) => [randomItem, ...prev]);
    }, 3000);
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
    <div class={styles.container}>
      <div class={styles.wrapper}>
        <div class={styles.header}>
          <h1>Tactics</h1>
        </div>

        <div class={styles.mainContent}>
          <RollerSection
            isOpening={isOpening()}
            onOpenCase={openCase}
            obtainedItem={obtainedItem()}
            inventory={inventory()}
            selectedTactic={selectedTactic()}
            onClearInventory={clearInventory}
            onSelectTactic={selectTactic}
          />
          <DetailsSection selectedTactic={selectedTactic()} />
        </div>
      </div>
    </div>
  );
};

export default TacticRoller;
