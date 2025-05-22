import type { Tactic } from "../tacticsCase";

export const vertigoCase = [
  {
    name: "Default Vertigo Tactic",
    image: "",
    rarity: "Mil-spec",
    weight: 1,
    map: "Vertigo",
  },
] as const satisfies readonly Tactic[];
