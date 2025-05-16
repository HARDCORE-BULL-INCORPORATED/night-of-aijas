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
    setCurrentPage(page);
    const url = new URL(window.location.toString());
    url.searchParams.set("page", page);
    window.history.pushState({}, "", url.toString());
  };

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageFromUrl = urlParams.get("page");
    if (pageFromUrl) {
      setCurrentPage(pageFromUrl);
    } else {
      // If no page in URL, set default and update URL
      const defaultPage = "home";
      setCurrentPage(defaultPage);
      const url = new URL(window.location.toString());
      url.searchParams.set("page", defaultPage);
      window.history.replaceState({}, "", url.toString()); // Use replaceState to avoid polluting history
    }

    // Listen for browser back/forward navigation
    window.addEventListener("popstate", () => {
      const params = new URLSearchParams(window.location.search);
      const newPage = params.get("page");
      if (newPage) {
        setCurrentPage(newPage);
      } else {
        // Fallback if page param is somehow removed
        setCurrentPage("home");
      }
    });
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
