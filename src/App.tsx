import { Router, Route } from "@solidjs/router";
import type { ParentComponent } from "solid-js";
import Docs from "./components/docs/Docs";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import "./App.css";
import MapRoulette from "./components/MapRoulette/MapRoulette";
import TacticsRoulettePage from "./components/TacticsRoulettePage/TacticsRoulettePage";
// import PIEPINATOR from "./components/PIEPINATOR/PIEPINATOR";
import ViinatRoulette from "./components/ViinatRoulette";

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
			{/* <Route path="/PIEP-I-NATOR" component={PIEPINATOR} /> */}
			<Route path="/viinat" component={ViinatRoulette} />
			<Route
				path="*"
				component={() => (
					<div class="container">
						<h1>Page Not Found</h1>
						<p>The page you're looking for doesn't exist.</p>
					</div>
				)}
			/>
		</Router>
	);
}

export default App;
