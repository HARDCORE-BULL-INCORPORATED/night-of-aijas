import { createSignal, Show, onMount } from "solid-js";
import Docs from "./components/docs/Docs";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Tactics from "./components/tactics/Tactics";
import "./App.css";

function App() {
  // Default to "home" if no value in localStorage
  const [currentPage, setCurrentPage] = createSignal("home");

  // Save to localStorage whenever the page changes
  const handlePageChange = (page: string) => {
    localStorage.setItem("currentPage", page);
    setCurrentPage(page);
  };

  // Load from localStorage on component mount
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
        {/* Add more sections here */}
      </main>
    </div>
  );
}

export default App;
