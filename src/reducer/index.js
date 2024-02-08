
import { CODReducer } from "./CODReducer";
import { cartReducer } from "./cardReducer";
import { couponReducer } from "./couponReducer";
import { drawerReducer } from "./drawerReducer";
import { searchReducer } from "./searchReducer";
import { userReducer } from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    coupon: couponReducer,
    COD: CODReducer
})

export default rootReducer