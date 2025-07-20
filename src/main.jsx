import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ModalProvider } from "./components/ModalContext.jsx";
import { store } from "./reducers/usersReducer";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>
);
