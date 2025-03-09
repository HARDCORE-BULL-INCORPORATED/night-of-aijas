import { Show, type Component, type JSX, onMount, onCleanup } from "solid-js";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const Modal: Component<ModalProps> = (props) => {
  const handleBackdropClick = (_e: MouseEvent) => {
    props.onClose();
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
      >
        <div class={styles.modalContent}>
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

export default Modal;
