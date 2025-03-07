import { createResource, For } from "solid-js";
import { supabase } from "../../utils/supabase";
import styles from "./BotStats.module.css";

async function getSongs() {
  const { data } = await supabase.from("songs").select();
  return data?.sort((a, b) => b.amount - a.amount) || [];
}

function BotStats() {
  const [songs] = createResource(getSongs);

  return (
    <div class={styles.statsContainer}>
      {songs.loading ? (
        <p class={styles.loading}>Loading stats...</p>
      ) : songs.error ? (
        <p class={styles.error}>Error loading stats: {songs.error.message}</p>
      ) : (
        <ul class={styles.statsList}>
          <For each={songs()}>
            {(song) => (
              <li class={styles.statsItem}>
                <span class={styles.songName}>{song.name}</span>
                <span class={styles.songAmount}>{song.amount}</span>
              </li>
            )}
          </For>
        </ul>
      )}
    </div>
  );
}

export default BotStats;
