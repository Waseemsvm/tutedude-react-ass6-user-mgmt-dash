import { useModal } from "./ModalContext";
import ModalStyles from "../styles/ModalStyles.module.css";

export default function Modal({ children }) {
  const { showModal } = useModal();

  return (
    showModal && (
      <>
        <div className={ModalStyles.overlay}>
          <div className={ModalStyles["modal-content"]}>{children}</div>
        </div>
      </>
    )
  );
}
