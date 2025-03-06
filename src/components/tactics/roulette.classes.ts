import { Ref } from "solid-js";
import { TacticItem } from "./tacticsTypes";

// TACTIC ROULETTE CLASS
export class TacticRoulette {
  winner: TacticItem;
  allTactics: TacticItem[];

  rouletteWrapperRef: Ref<HTMLElement>;
  tacticWrapperRef: Ref<HTMLElement>;

  tactics: TacticItem[];

  tacticsCount: number;
  tacticPrizeId: number;

  transitionDuration: number;

  itemWidth: number;

  constructor(attrs: {
    winner: TacticItem;
    tactics: TacticItem[];
    rouletteContainerRef: Ref<HTMLElement>;
    tacticsRef: Ref<HTMLElement>;
    tacticsCount?: number;
    transitionDuration?: number;
    itemWidth?: number;
  }) {
    // attributes for generating tactics array
    this.winner = attrs.winner;
    this.allTactics = attrs.tactics;

    // all tactics (prize tactic + actor tactics)
    this.tactics = [];

    // parent DOM element refs for roulette
    this.rouletteWrapperRef = attrs.rouletteContainerRef;
    this.tacticWrapperRef = attrs.tacticsRef;

    // total number of tactics
    this.tacticsCount = attrs.tacticsCount || 50;

    // prize id
    this.tacticPrizeId = this.randomRange(
      this.tacticsCount / 2,
      this.tacticsCount - 5
    );

    this.transitionDuration = attrs.transitionDuration || 10;

    this.itemWidth = attrs.itemWidth || 200;
  }

  private randomRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  private shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  set_tactics = () => {
    let tactics: TacticItem[] = []; // declare tactics array
    let tactic_actors_len = this.allTactics.length; // number of tactics from DB

    const set_tactic_actors = (from_i: number, to_i: number) => {
      const createdTactics: TacticItem[] = [];
      for (let i = from_i; i <= to_i; i += 1) {
        // Select a random tactic
        const randomIndex = Math.floor(Math.random() * tactic_actors_len);
        createdTactics.push({ ...this.allTactics[randomIndex], id: i });
      }
      this.shuffle(createdTactics);
      return createdTactics;
    };

    // no tactics - error
    if (tactic_actors_len === 0) {
      throw new Error("Error! No actor tactics.");
    }

    /**
     * set tactics from 0 to prize ID
     */
    tactics = tactics.concat(set_tactic_actors(0, this.tacticPrizeId - 1));

    // create prize tactic
    tactics[this.tacticPrizeId] = { ...this.winner, id: this.tacticPrizeId };

    /** set tactics from prize ID to end */
    tactics = tactics.concat(
      set_tactic_actors(this.tacticPrizeId + 1, this.tacticsCount - 1)
    );
    this.tactics = tactics;
  };

  /** ROULETTE SPIN
   -----------------------------------------------------------------------------*/
  spin = () => {
    const tacticWrapper = this.tacticWrapperRef as unknown as HTMLElement;

    if (!tacticWrapper) {
      console.error("Tactics wrapper element not found!");
      return -1;
    }

    // First reset position to start
    tacticWrapper.style.transition = "none";
    tacticWrapper.style.left = "0px";

    // Force a reflow to ensure the reset is applied immediately
    void tacticWrapper.offsetWidth;

    // Calculate the center of the roulette container
    const rouletteContainer = this.rouletteWrapperRef as unknown as HTMLElement;
    const rouletteWidth =
      rouletteContainer?.getBoundingClientRect().width || 800;
    const centerPosition = rouletteWidth / 2;

    // Calculate where the prize item should end up
    const prizeItemPosition = this.tacticPrizeId * this.itemWidth;

    // Calculate the distance we need to scroll to center the prize item
    const scrollDistance =
      prizeItemPosition - centerPosition + this.itemWidth / 2;

    // Add a small random offset to make it look more natural
    const randomOffset = this.randomRange(-10, 10);

    // Final scroll position
    const finalScrollPosition = scrollDistance + randomOffset;

    // Set the animation
    tacticWrapper.style.transition = `left ${this.transitionDuration}s ease-out`;

    // Slight delayed start
    setTimeout(() => {
      tacticWrapper.style.left = `-${finalScrollPosition}px`;
    }, 50);

    return this.tacticPrizeId;
  };
}
