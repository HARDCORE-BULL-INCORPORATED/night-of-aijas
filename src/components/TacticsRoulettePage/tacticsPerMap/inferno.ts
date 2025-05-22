import type { Tactic } from "../tacticsCase";

export const infernoCase = [
  {
    name: "Default Inferno Tactic",
    image: "",
    rarity: "Mil-spec",
    weight: 1,
    map: "Inferno",
  },
] as const satisfies readonly Tactic[];
