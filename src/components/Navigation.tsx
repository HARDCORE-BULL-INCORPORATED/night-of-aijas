import type { Component } from "solid-js";

interface NavigationProps {
    activePage: string;
    onNavigate: (page: string) => void;
}

const Navigation: Component<NavigationProps> = (props) => {
    const handleNavigation = (page: string) => {
        props.onNavigate(page);
    };

    return (
        <nav class="nav-container">
            <ul>
                <li class={props.activePage === "home" ? "active" : ""}>
                    <a
                        href="/?page=home"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation("home");
                        }}
                    >
                        <h2>Home</h2>
                    </a>
                </li>
                <li class={props.activePage === "docs" ? "active" : ""}>
                    <a
                        href="/?page=docs"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation("docs");
                        }}
                    >
                        <h2>Docs</h2>
                    </a>
                </li>
                <li class={props.activePage === "tactics" ? "active" : ""}>
                    <a
                        href="/?page=tactics"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation("tactics");
                        }}
                    >
                        <h2>Tactics</h2>
                    </a>
                </li>
                <li class={props.activePage === "PIEP-I-NATOR" ? "active" : ""}>
                    <a
                        href="/?page=PIEP-I-NATOR"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation("PIEP-I-NATOR");
                        }}
                    >
                        <h2>PIEP-I-NATOR</h2>
                    </a>
                </li>
                <li class={props.activePage === "roulette" ? "active" : ""}>
                    <a
                        href="/?page=roulette"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNavigation("roulette");
                        }}
                    >
                        <h2>MAPS</h2>
                    </a>
                </li>
            </ul>
            <hr class="cs-hr" />
        </nav>
    );
};

export default Navigation;
