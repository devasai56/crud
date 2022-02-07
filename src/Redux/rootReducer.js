import { combineReducers } from "redux";
import members from "./TeamMembers/reducer";

const rootReducer = combineReducers({members})

export default rootReducer