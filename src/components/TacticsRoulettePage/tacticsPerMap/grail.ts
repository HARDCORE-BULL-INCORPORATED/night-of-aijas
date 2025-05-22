import type { Tactic } from "../tacticsCase";

export const grailCase = [
  {
    name: "Default Grail Tactic",
    image: "",
    rarity: "Mil-spec",
    weight: 1,
    map: "Grail",
  },
] as const satisfies readonly Tactic[];
