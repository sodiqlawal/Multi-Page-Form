import AppRoute from "routes/routes";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "store";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ToastContainer />
      <AppRoute />
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
