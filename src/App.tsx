import { createSignal, Show, onMount } from "solid-js";
import Docs from "./components/docs/Docs";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Tactics from "./components/tactics/Tactics";
import "./App.css";
import PIEPINATOR from "./components/PIEPINATOR/PIEPINATOR";
import CaseOpeningDemo from "./components/roulette/CaseOpeningDemo";

function App() {
  const [currentPage, setCurrentPage] = createSignal("home");

  const handlePageChange = (page: string) => {
    localStorage.setItem("currentPage", page);
    setCurrentPage(page);
  };

  onMount(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(savedPage);
    }
  });

  return (
    <div class="app-container">
      <header class="header">
        <Navigation activePage={currentPage()} onNavigate={handlePageChange} />
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
        <Show when={currentPage() === "PIEP-I-NATOR"}>
          <PIEPINATOR />
        </Show>
        <Show when={currentPage() === "roulette"}>
          <CaseOpeningDemo />
        </Show>
      </main>
    </div>
  );
}

export default App;
