import { Component } from "solid-js";

interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Navigation: Component<NavigationProps> = (props) => {
  return (
    <nav class="nav-container">
      <ul>
        <li class={props.activePage === "home" ? "active" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              props.onNavigate("home");
            }}
          >
            <h2>Home</h2>
          </a>
        </li>
        <li class={props.activePage === "docs" ? "active" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              props.onNavigate("docs");
            }}
          >
            <h2>Docs</h2>
          </a>
        </li>
        <li class={props.activePage === "tactics" ? "active" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              props.onNavigate("tactics");
            }}
          >
            <h2>Tactics</h2>
          </a>
        </li>
        <li class={props.activePage === "PIEP-I-NATOR" ? "active" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              props.onNavigate("PIEPINATOR");
            }}
          >
            <h2>PIEP-I-NATOR</h2>
          </a>
        </li>
      </ul>
      <hr class="cs-hr" />
    </nav>
  );
};

export default Navigation;
