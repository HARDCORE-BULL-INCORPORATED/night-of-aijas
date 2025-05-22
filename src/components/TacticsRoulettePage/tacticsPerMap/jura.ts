import type { Tactic } from "../tacticsCase";

export const juraCase = [
  {
    name: "Default Jura Tactic",
    image: "",
    rarity: "Mil-spec",
    weight: 1,
    map: "Jura",
  },
] as const satisfies readonly Tactic[];
