import type { Tactic } from "../tacticsCase";

export const anubisCase = [
  {
    name: "Default Anubis Tactic",
    image: "",
    rarity: "Mil-spec",
    weight: 1,
    map: "Anubis",
  },
] as const satisfies readonly Tactic[];
