import { spawn } from "redux-saga/effects";
import productSaga from "./productSaga";

function* rootSaga() {
  yield spawn(productSaga);
}

export default rootSaga;
