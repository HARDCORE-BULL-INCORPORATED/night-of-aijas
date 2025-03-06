import styles from "./TacticRoller.module.css";

export interface TacticItem {
  id?: number;
  name: string;
  rarity: string;
  color: "blue" | "purple" | "red" | "yellow" | "pink";
  image: string;
  chance?: number; // Higher number = higher probability
  description?: string;
}

export const tacticPool: TacticItem[] = [
  {
    name: "TROLOLOLOLO",
    rarity: "Mil-Spec",
    color: "blue",
    image: "/tactics/trollface.png",
    chance: 40,
    description:
      "The classic troll strategy. Confuse your enemies with unpredictable moves.",
  },
  {
    name: "PEPE",
    rarity: "Restricted",
    color: "purple",
    image: "/tactics/bruhpepe.jpg",
    chance: 20,
    description: "Bruh... just sit and wait. Patience is key.",
  },
  {
    name: "BIG BIG CHUNGUS",
    rarity: "Classified",
    color: "pink",
    image: "/tactics/bigchungus.png",
    chance: 10,
    description:
      "Become the absolute unit. Take up space and intimidate opponents.",
  },
  {
    name: "YKÄSONNI",
    rarity: "Covert",
    color: "red",
    image: "/ykäsonni.jpg",
    chance: 5,
    description:
      "The legendary bull tactic. Charge straight at your enemies with no fear.",
  },
  {
    name: "PAASO",
    rarity: "Extraordinary",
    color: "yellow",
    image: "/tactics/vanha-käppänä.png",
    chance: 1,
    description:
      "Ancient wisdom. Move slowly but strike with precision and experience.",
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
