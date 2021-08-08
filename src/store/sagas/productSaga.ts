/* eslint-disable no-debugger */
import { call, takeLatest, put } from "redux-saga/effects";
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsError,
  editProduct,
  editProductSuccess,
  editProductError,
} from "../actions/products";
import Notify from "../actions/notifyAction";

import { fetchProductService, editProductService } from "services/products";

function* fetchProductsSaga(action: ReturnType<typeof fetchProducts>) {
  try {
    const response = yield call(fetchProductService);
    console.log(response, "all response");

    yield put(
      fetchProductsSuccess({
        total: response.total,
        products: response,
      })
    );
  } catch (error) {
    yield put(
      fetchProductsError({
        error,
      })
    );
    yield put(Notify.error(error.message));
  }
}

function* editProductSaga(action: ReturnType<typeof editProduct>) {
  try {
    const response = yield call(editProductService, action.payload);

    yield put(editProductSuccess(response.payload));
    yield put(Notify.success("Contribution type updated successfully!"));
    action.payload.onSuccess?.();
  } catch (error) {
    yield put(editProductError(error));
    yield put(Notify.error(error.message));
  } finally {
    action.payload.onCompleted?.();
  }
}

function* contributionSaga() {
  yield takeLatest(fetchProducts, fetchProductsSaga);
  yield takeLatest(editProduct, editProductSaga);
}

export default contributionSaga;
