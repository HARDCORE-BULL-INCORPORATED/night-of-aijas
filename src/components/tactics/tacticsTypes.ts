import styles from "./TacticRoller.module.css";

export interface TacticItem {
  name: string;
  rarity: string;
  color: "blue" | "purple" | "red" | "yellow" | "orange";
  image: string;
}

export const tacticPool: TacticItem[] = [
  {
    name: "Pepe",
    rarity: "Mil-Spec",
    color: "blue",
    image: "/tactics/bruhpepe.jpg",
  },
  {
    name: "YKÄSONNI",
    rarity: "Contraband",
    color: "red",
    image: "/ykäsonni.jpg",
  },
  {
    name: "YKÄSONNI",
    rarity: "Covert",
    color: "yellow",
    image: "/ykäsonni.jpg",
  },
  {
    name: "Paaso",
    rarity: "Legendary",
    color: "purple",
    image: "/tactics/vanha-käppänä.png",
  },
  {
    name: "Paaso",
    rarity: "Immortal",
    color: "orange",
    image: "/tactics/vanha-käppänä.png",
  },
];

// Utility function for styling
export const getItemBorderClass = (color: TacticItem["color"]) => {
  const borderClasses = {
    blue: styles.borderBlue,
    purple: styles.borderPurple,
    red: styles.borderRed,
    yellow: styles.borderYellow,
    orange: styles.borderOrange,
  };
  return borderClasses[color];
};
