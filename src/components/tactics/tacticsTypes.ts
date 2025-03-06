import styles from "./TacticRoller.module.css";

export interface TacticItem {
  id?: number;
  name: string;
  rarity: string;
  color: "blue" | "purple" | "red" | "yellow" | "pink";
  image: string;
  chance?: number; // Higher number = higher probability
}

export const tacticPool: TacticItem[] = [
  {
    name: "TROLOLOLOLO",
    rarity: "Mil-Spec",
    color: "blue",
    image: "/tactics/trollface.png",
    chance: 40,
  },
  {
    name: "PEPE",
    rarity: "Restricted",
    color: "purple",
    image: "/tactics/bruhpepe.jpg",
    chance: 20,
  },
  {
    name: "BIG BIG CHUNGUS",
    rarity: "Classified",
    color: "pink",
    image: "/tactics/bigchungus.png",
    chance: 90,
  },
  {
    name: "YKÄSONNI",
    rarity: "Covert",
    color: "red",
    image: "/ykäsonni.jpg",
    chance: 5,
  },
  {
    name: "PAASO",
    rarity: "Extraordinary",
    color: "yellow",
    image: "/tactics/vanha-käppänä.png",
    chance: 1,
  },
];

// Utility function for styling
export const getItemBorderClass = (color: TacticItem["color"]) => {
  const borderClasses = {
    blue: styles.borderBlue,
    purple: styles.borderPurple,
    red: styles.borderRed,
    yellow: styles.borderYellow,
    pink: styles.borderPink,
  };
  return borderClasses[color];
};
