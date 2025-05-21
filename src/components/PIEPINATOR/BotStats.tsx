import { createResource, createSignal, For, Show } from "solid-js";
import { supabase } from "../../utils/supabase";
import styles from "./BotStats.module.css";

async function getSongs() {
	//@ts-ignore
	let allData = [];
	let page = 0;
	const pageSize = 1000;

	while (true) {
		const { data, error } = await supabase
			.from("songs")
			.select()
			.range(page * pageSize, (page + 1) * pageSize - 1);

		if (error) throw error;
		if (!data || data.length === 0) break;

		//@ts-ignore
		allData = [...allData, ...data];
		if (data.length < pageSize) break;
		page++;
	}
	//@ts-ignore
	return allData.sort((a, b) => b.amount - a.amount);
}

function BotStats() {
	const [songs] = createResource(getSongs);
	const [currentPage, setCurrentPage] = createSignal(1);
	const [itemsPerPage, setItemsPerPage] = createSignal(10);
	const [goToPageInput, setGoToPageInput] = createSignal("");
	const [showGoToPage, setShowGoToPage] = createSignal(false);

	// Calculate pagination values
	const totalPages = () => Math.ceil((songs() || []).length / itemsPerPage());

	const currentItems = () => {
		const items = songs() || [];
		const start = (currentPage() - 1) * itemsPerPage();
		const end = start + itemsPerPage();
		return items.slice(start, end);
	};

	// Get window width for responsive behavior
	const isMobile = () => window.innerWidth < 640;

	// Handle page changes
	const nextPage = () => {
		if (currentPage() < totalPages()) {
			setCurrentPage(currentPage() + 1);
			window.scrollTo(0, 0); // Scroll to top for better UX
		}
	};

	const prevPage = () => {
		if (currentPage() > 1) {
			setCurrentPage(currentPage() - 1);
			window.scrollTo(0, 0); // Scroll to top for better UX
		}
	};

	const goToPage = (page: number) => {
		setCurrentPage(page);
		window.scrollTo(0, 0); // Scroll to top for better UX
	};

	const handleGoToPage = (e: Event) => {
		e.preventDefault();
		const pageNum = Number.parseInt(goToPageInput());
		if (!Number.isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages()) {
			setCurrentPage(pageNum);
			setGoToPageInput(""); // Clear input after successful navigation
			setShowGoToPage(false); // Hide the form after submission
			window.scrollTo(0, 0); // Scroll to top for better UX
		} else {
			alert(`Please enter a valid page number between 1 and ${totalPages()}`);
		}
	};

	// Generate page numbers
	const pageNumbers = () => {
		const total = totalPages();
		const current = currentPage();
		const pages = [];

		// Show fewer page numbers on mobile
		const range = isMobile() ? 1 : 2;

		// Always show first page
		pages.push(1);

		// Add ellipsis after first page if needed
		if (current > range + 1) {
			pages.push("ellipsis1");
		}

		// Calculate range around current page
		for (
			let i = Math.max(2, current - range);
			i <= Math.min(total - 1, current + range);
			i++
		) {
			pages.push(i);
		}

		// Add ellipsis before last page if needed
		if (current < total - range) {
			pages.push("ellipsis2");
		}

		// Always show last page if there is more than one page
		if (total > 1) {
			pages.push(total);
		}

		return pages;
	};

	const toggleGoToPage = () => {
		setShowGoToPage(!showGoToPage());
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
							id="itemsPerPageSelect"
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
									<a href={song.url} class={styles.songLink}>
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
							&lt;
						</button>

						<div class={styles.pageNumbersContainer}>
							<For each={pageNumbers()}>
								{(pageNum) => (
									<>
										{pageNum === "ellipsis1" || pageNum === "ellipsis2" ? (
											<span class={styles.ellipsis}>...</span>
										) : (
											<button
												type="button"
												class={`${styles.pageButton} ${
													pageNum === currentPage() ? styles.active : ""
												}`}
												onClick={() => goToPage(pageNum as number)}
											>
												{pageNum}
											</button>
										)}
									</>
								)}
							</For>
						</div>

						<button
							type="button"
							class={styles.pageButton}
							onClick={nextPage}
							disabled={currentPage() === totalPages()}
						>
							&gt;
						</button>

						<button
							type="button"
							class={`${styles.pageButton} ${styles.goToPageToggle}`}
							onClick={toggleGoToPage}
						>
							...
						</button>
					</div>

					<Show when={showGoToPage()}>
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
							<button type="submit" class="cs-btn">
								Go
							</button>
						</form>
					</Show>

					<div class={styles.pageInfo}>
						Page {currentPage()} of {totalPages()} ({(songs() || []).length}{" "}
						total items)
					</div>
				</>
			)}
		</div>
	);
}

export default BotStats;
