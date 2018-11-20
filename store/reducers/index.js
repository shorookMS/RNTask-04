import { combineReducers } from "redux";

// Reducers
import coffeeReducer from "./coffeeReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  coffee: coffeeReducer,
  cart: cartReducer,
  auth: authReducer
});
