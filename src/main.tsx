import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

import App from './App'
import { store } from "./app/store";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
);
