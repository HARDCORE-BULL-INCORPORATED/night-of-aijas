import type { Component } from "solid-js";
import { A, useLocation } from "@solidjs/router";

const Navigation: Component = () => {
	const location = useLocation();

	const isActive = (path: string) => {
		if (path === "/" || path === "/home") {
			return location.pathname === "/" || location.pathname === "/home";
		}
		return location.pathname.startsWith(path);
	};

	return (
		<nav class="nav-container">
			<ul>
				<li class={isActive("/") ? "active" : ""}>
					<A href="/">
						<h2>Home</h2>
					</A>
				</li>
				<li class={isActive("/docs") ? "active" : ""}>
					<A href="/docs">
						<h2>Docs</h2>
					</A>
				</li>
				<li class={isActive("/tactics") ? "active" : ""}>
					<A href="/tactics">
						<h2>Tactics</h2>
					</A>
				</li>
				<li class={isActive("/roulette") ? "active" : ""}>
					<A href="/roulette">
						<h2>MAPS</h2>
					</A>
				</li>
				{/* <li class={isActive("/PIEP-I-NATOR") ? "active" : ""}>
					<A href="/PIEP-I-NATOR">
						<h2>PIEP-I-NATOR</h2>
					</A>
				</li> */}
				<li class={isActive("/viinat") ? "active" : ""}>
					<A href="/viinat">
						<h2>Viinat</h2>
					</A>
				</li>
			</ul>
			<hr class="cs-hr" />
		</nav>
	);
};

export default Navigation;
