import { createResource, createSignal, For } from "solid-js";
import { supabase } from "../../utils/supabase";
import styles from "./BotStats.module.css";

async function getSongs() {
  const { data } = await supabase.from("songs").select();
  return data?.sort((a, b) => b.amount - a.amount) || [];
}

function BotStats() {
  const [songs] = createResource(getSongs);
  const [currentPage, setCurrentPage] = createSignal(1);
  const [itemsPerPage, setItemsPerPage] = createSignal(10);
  const [goToPageInput, setGoToPageInput] = createSignal("");

  // Calculate pagination values
  const totalPages = () => Math.ceil((songs() || []).length / itemsPerPage());

  const currentItems = () => {
    const items = songs() || [];
    const start = (currentPage() - 1) * itemsPerPage();
    const end = start + itemsPerPage();
    return items.slice(start, end);
  };

  // Handle page changes
  const nextPage = () => {
    if (currentPage() < totalPages()) {
      setCurrentPage(currentPage() + 1);
    }
  };

  const prevPage = () => {
    if (currentPage() > 1) {
      setCurrentPage(currentPage() - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoToPage = (e: Event) => {
    e.preventDefault();
    const pageNum = Number.parseInt(goToPageInput());
    if (!Number.isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages()) {
      setCurrentPage(pageNum);
      setGoToPageInput(""); // Clear input after successful navigation
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages()}`);
    }
  };

  // Generate page numbers
  const pageNumbers = () => {
    const total = totalPages();
    const current = currentPage();
    const pages = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }

    // Always show last page
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  };

  return (
    <div class={styles.statsContainer}>
      {songs.loading ? (
        <p class={styles.loading}>Loading stats...</p>
      ) : songs.error ? (
        <p class={styles.error}>Error loading stats: {songs.error.message}</p>
      ) : (
        <>
          <div class={styles.pageInfo}>
            <select
              class={styles.itemsPerPageSelect}
              value={itemsPerPage()}
              onChange={(e) => {
                setItemsPerPage(Number.parseInt(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>

          <ul class={styles.statsList}>
            <For each={currentItems()}>
              {(song) => (
                <li class={styles.statsItem}>
                  <a href={song.url}>
                    <span class={styles.songName}>{song.name}</span>
                    <span class={styles.songAmount}>{song.amount}</span>
                  </a>
                </li>
              )}
            </For>
          </ul>

          <div class={styles.pagination}>
            <button
              type="button"
              class={styles.pageButton}
              onClick={prevPage}
              disabled={currentPage() === 1}
            >
              Previous
            </button>

            <For each={pageNumbers()}>
              {(pageNum) => (
                <button
                  type="button"
                  class={`${styles.pageButton} ${
                    pageNum === currentPage() ? styles.active : ""
                  }`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              )}
            </For>

            <button
              type="button"
              class={styles.pageButton}
              onClick={nextPage}
              disabled={currentPage() === totalPages()}
            >
              Next
            </button>

            <form class={styles.goToPageForm} onSubmit={handleGoToPage}>
              <input
                type="number"
                value={goToPageInput()}
                onInput={(e) => setGoToPageInput(e.target.value)}
                placeholder="Go to page..."
                min="1"
                max={totalPages()}
                class={styles.goToPageInput}
              />
              <button type="submit" class={styles.pageButton}>
                Go
              </button>
            </form>
          </div>

          <div class={styles.pageInfo}>
            Page {currentPage()} of {totalPages()}({(songs() || []).length}{" "}
            total items)
          </div>
        </>
      )}
    </div>
  );
}

export default BotStats;
