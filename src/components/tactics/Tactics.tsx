import type { Component } from "solid-js";
import TacticRoller from "./TacticRoller";

const Tactics: Component = () => {
    return (
        <div class="container">
            <h1>LE EPIC TACTIC GENERATOR NATOR</h1>
            <TacticRoller />
        </div>
    );
};

export default Tactics;
