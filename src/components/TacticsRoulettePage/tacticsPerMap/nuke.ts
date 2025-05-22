import type { Tactic } from "../tacticsCase";

export const nukeCase = [
  {
    name: "Default Nuke Tactic",
    image: "",
    rarity: "Mil-spec",
    weight: 1,
    map: "Nuke",
  },
] as const satisfies readonly Tactic[];
