import { useEffect } from "react";
import styles from "./modal.module.css";

/* Genbrugelig modal. Bruges sådan:
     <Modal isOpen={!!modal} onClose={() => setModal(null)} title="Tilføj ret">
       ...formular...
     </Modal>
   - Klik på den mørke baggrund eller tryk Esc lukker modalen.
   - Klik inde i selve modalen lukker IKKE (stopPropagation). */
const Modal = ({ isOpen, onClose, title, children }) => {
  // Luk med Esc-tasten, mens modalen er åben.
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Luk">
          ×
        </button>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
