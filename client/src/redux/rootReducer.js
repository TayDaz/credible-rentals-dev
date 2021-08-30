import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import loginReducer from "./login/reducer";
import createAccountReducer from "./create-account/reducer";
import uploadsReducer from "./uploads/reducer";
import forgotPasswordReducer from "./forgot-password/reducer";
import profileReducer from "./profile/reducer";
import homeReducer from "./home/reducer";
import myOrdersReducer from "./my-orders/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  createAccount: createAccountReducer,
  forgotPassword: forgotPasswordReducer,
  uploads: uploadsReducer,
  profile: profileReducer,
  home: homeReducer,
  myOrders: myOrdersReducer,
});

export default rootReducer;
