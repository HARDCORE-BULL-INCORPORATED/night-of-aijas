import { Router, Route } from "@solidjs/router";
import type { ParentComponent } from "solid-js";
import Docs from "./components/docs/Docs";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import "./App.css";
import MapRoulette from "./components/MapRoulette/MapRoulette";
import TacticsRoulettePage from "./components/TacticsRoulettePage/TacticsRoulettePage";
import PIEPINATOR from "./components/PIEPINATOR/PIEPINATOR";

const Layout: ParentComponent = (props) => {
	return (
		<div class="app-container">
			<header class="header">
				<Navigation />
			</header>
			<main>{props.children}</main>
		</div>
	);
};

function App() {
	return (
		<Router root={Layout}>
			<Route path="/" component={Home} />
			<Route path="/docs" component={Docs} />
			<Route path="/tactics" component={TacticsRoulettePage} />
			<Route path="/tactics/:map/:side" component={TacticsRoulettePage} />
			<Route path="/roulette" component={MapRoulette} />
			<Route path="/PIEP-I-NATOR" component={PIEPINATOR} />
		</Router>
	);
}

export default App;
