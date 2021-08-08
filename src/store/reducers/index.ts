import { combineReducers } from "redux";
import productReducer from "./products";

const rootReducer = combineReducers({
  productReducer: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
