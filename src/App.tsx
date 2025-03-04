import { createSignal, Show } from "solid-js";
import Docs from "./components/docs/Docs";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Tactics from "./components/tactics/Tactics";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = createSignal("home");

  return (
    <div class="app-container">
      <header class="header">
        <Navigation activePage={currentPage()} onNavigate={setCurrentPage} />
      </header>
      <main>
        <Show when={currentPage() === "home"}>
          <Home />
        </Show>

        <Show when={currentPage() === "docs"}>
          <Docs />
        </Show>

        <Show when={currentPage() === "tactics"}>
          <Tactics />
        </Show>
        {/* Add more sections here */}
      </main>
    </div>
  );
}

export default App;
