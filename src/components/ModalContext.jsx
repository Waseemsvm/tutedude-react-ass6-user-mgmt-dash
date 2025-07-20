import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <ModalContext.Provider
      value={{ showModal, setShowModal, isEditMode, setIsEditMode }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
