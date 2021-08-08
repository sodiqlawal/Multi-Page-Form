import AppRoute from "routes/routes";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "store";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <AppRoute />
      </PersistGate>
    </Provider>
  );
}

export default App;
