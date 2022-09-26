import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import carReducer from "./carReducer";
import orderReducer from "./orderReducer";
import clientReducer from "./clientReducer";
import carParkingReducer from "./carParkingReducer";
import carScrapReducer from "./carScrapReducer";
import rampReducer from "./rampReducer";
import forkliftReducer from "./forkliftReducer";
import shippingReducer from "./shippingReducer";
import storageRentReducer from "./storageRentReducer";
import outsideStorageReducer from "./outsideStorageReducer";
import reportReducer from "./reportReducer";
import orderNoteReducer from "./orderNoteReducer";
import message from "./message";
export default combineReducers({
  authReducer,
  userReducer,
  clientReducer,
  carReducer,
  orderReducer,
  message,
  carParkingReducer,
  rampReducer,
  forkliftReducer,
  shippingReducer,
  storageRentReducer,
  outsideStorageReducer,
  carScrapReducer,
  reportReducer,
  orderNoteReducer,
});
