import { createResource, For } from "solid-js";
import { supabase } from "../../utils/supabase";

async function getSongs() {
  const { data } = await supabase.from("songs").select();
  return data;
}

function PIEPINATOR() {
  const [songs] = createResource(getSongs);

  return (
    <ul>
      <For each={songs()}>
        {(instrument) => (
          <li>
            {instrument.name} - {instrument.amount}
          </li>
        )}
      </For>
    </ul>
  );
}

export default PIEPINATOR;
