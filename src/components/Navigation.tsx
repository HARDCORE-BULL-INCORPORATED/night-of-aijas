import type { Component } from "solid-js";

interface NavigationProps {
    activePage: string;
    onNavigate: (page: string) => void;
}

const Navigation: Component<NavigationProps> = (props) => {
    return (
        <nav class="nav-container">
            <ul>
                <li class={props.activePage === "home" ? "active" : ""}>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onNavigate("home");
                        }}
                    >
                        <h2>Home</h2>
                    </button>
                </li>
                <li class={props.activePage === "docs" ? "active" : ""}>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onNavigate("docs");
                        }}
                    >
                        <h2>Docs</h2>
                    </button>
                </li>
                <li class={props.activePage === "tactics" ? "active" : ""}>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onNavigate("tactics");
                        }}
                    >
                        <h2>Tactics</h2>
                    </button>
                </li>
                <li class={props.activePage === "PIEP-I-NATOR" ? "active" : ""}>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onNavigate("PIEP-I-NATOR");
                        }}
                    >
                        <h2>PIEP-I-NATOR</h2>
                    </button>
                </li>
                <li class={props.activePage === "roulette" ? "active" : ""}>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onNavigate("roulette");
                        }}
                    >
                        <h2>MAPS</h2>
                    </button>
                </li>
            </ul>
            <hr class="cs-hr" />
        </nav>
    );
};

export default Navigation;
