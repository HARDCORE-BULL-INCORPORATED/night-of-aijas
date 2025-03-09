import { Show, type Component, type JSX, onMount, onCleanup } from "solid-js";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const InventoryModal: Component<ModalProps> = (props) => {
  const handleBackdropClick = (e: MouseEvent) => {
    // Only close if clicking the backdrop itself
    if (e.currentTarget === e.target) {
      props.onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.onClose();
    }
  };

  // Prevent background scrolling when modal is open
  onMount(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    }
  });

  onCleanup(() => {
    document.body.style.overflow = "unset";
  });

  return (
    <Show when={props.isOpen}>
      <div
        class={`${styles.modalBackdrop} ${props.isOpen ? styles.active : ""}`}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      >
        <div
          class={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            class={styles.closeButton}
            onClick={props.onClose}
          >
            ×
          </button>
          {props.children}
        </div>
      </div>
    </Show>
  );
};

export default InventoryModal;
