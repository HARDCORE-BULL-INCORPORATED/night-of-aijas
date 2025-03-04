import { Component, createSignal } from "solid-js";
import styles from "./TacticRoller.module.css";

// Define item interface
interface TacticItem {
  name: string;
  rarity: string;
  color: "blue" | "purple" | "red" | "yellow" | "orange";
  image: string;
}

// Sample item pool
const tacticPool: TacticItem[] = [
  {
    name: "AK-47 | Redline",
    rarity: "Mil-Spec",
    color: "blue",
    image: "/tactics/vanha-käppänä.png",
  },
  {
    name: "M4A4 | Howl",
    rarity: "Contraband",
    color: "red",
    image: "/ykäsonni.jpg",
  },
  {
    name: "AWP | Dragon Lore",
    rarity: "Covert",
    color: "yellow",
    image: "/ykäsonni.jpg",
  },
  {
    name: "Karambit | Doppler",
    rarity: "Legendary",
    color: "purple",
    image: "/ykäsonni.jpg",
  },
  {
    name: "Knife | Fade",
    rarity: "Immortal",
    color: "orange",
    image: "/ykäsonni.jpg",
  },
];

const TacticRoller: Component = () => {
  const [isOpening, setIsOpening] = createSignal(false);
  const [obtainedItem, setObtainedItem] = createSignal<TacticItem | null>(null);

  const openCase = () => {
    // Reset state
    setIsOpening(true);
    setObtainedItem(null);

    // Simulate case opening
    setTimeout(() => {
      const randomItem =
        tacticPool[Math.floor(Math.random() * tacticPool.length)];
      setObtainedItem(randomItem);
      setIsOpening(false);
    }, 3000);
  };

  const getItemBorderClass = (color: TacticItem["color"]) => {
    const borderClasses = {
      blue: styles.borderBlue,
      purple: styles.borderPurple,
      red: styles.borderRed,
      yellow: styles.borderYellow,
      orange: styles.borderOrange,
    };
    return borderClasses[color];
  };

  return (
    <div class={styles.container}>
      <div class={styles.wrapper}>
        <div class={styles.header}>
          <h1>Tactics</h1>
        </div>

        <div class={styles.content}>
          <button onClick={openCase} disabled={isOpening()} class="cs-btn">
            {isOpening() ? "Rolling Tactic..." : "Roll Tactic"}
          </button>

          <div class={styles.resultDisplay}>
            {isOpening() ? (
              <div class={styles.openingAnimation}>
                <div class={styles.chevronDown}></div>
                <p>Revealing tactic...</p>
              </div>
            ) : obtainedItem() ? (
              <div class={styles.obtainedItem}>
                <div
                  class={`${styles.itemCard} ${getItemBorderClass(
                    obtainedItem()!.color
                  )}`}
                >
                  <img src={obtainedItem()!.image} alt={obtainedItem()!.name} />
                </div>
                <h2>{obtainedItem()!.name}</h2>
                <p>{obtainedItem()!.rarity}</p>
              </div>
            ) : (
              <div class={styles.initialState}>
                <div class={styles.giftIcon}></div>
                <p>Click 'Roll Tactic' to begin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticRoller;
