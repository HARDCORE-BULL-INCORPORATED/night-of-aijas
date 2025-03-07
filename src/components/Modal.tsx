import type { Component, JSX } from "solid-js";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const Modal: Component<ModalProps> = (props) => {
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <Show when={props.isOpen}>
      <div class={styles.modalBackdrop} onClick={handleBackdropClick}>
        <div class={styles.modalContent}>
          <button class={styles.closeButton} onClick={props.onClose}>
            ×
          </button>
          {props.children}
        </div>
      </div>
    </Show>
  );
};

export default Modal;
