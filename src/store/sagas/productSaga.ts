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

import { fetchProductService, editProductService } from "services/products";
import { toastError, toastSuccess } from "lib/utils/toasters";

function* fetchProductsSaga() {
  try {
    const { payload } = yield call(fetchProductService);

    yield put(
      fetchProductsSuccess({
        total: payload.data.total,
        products: payload.data,
      })
    );
  } catch (error) {
    yield put(
      fetchProductsError({
        error,
      })
    );
    toastError(error.message);
  }
}

function* editProductSaga(action: ReturnType<typeof editProduct>) {
  try {
    const { response } = yield call(editProductService, action.payload);

    yield put(editProductSuccess(response.payload));
    toastSuccess("Product editted successfully!");
    action.payload.onSuccess?.();
  } catch (error) {
    yield put(editProductError(error));
    toastError(error.message);
  } finally {
    action.payload.onCompleted?.();
  }
}

function* productSaga() {
  yield takeLatest(fetchProducts, fetchProductsSaga);
  yield takeLatest(editProduct, editProductSaga);
}

export default productSaga;
