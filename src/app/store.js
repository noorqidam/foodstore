import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import authReducer from "../features/Auth/reducer";
import productReducer from "../features/Products/reducer";
import cartReducer from "../features/Cart/reducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
});

const store = createStore(
  rootReducers,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
