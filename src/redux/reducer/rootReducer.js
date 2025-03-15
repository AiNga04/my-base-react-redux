import { combineReducers } from "redux";
import userReducer from "./userReducer";
import quizReducer from "./quizReducer"; // Import the quizReducer

const rootReducer = combineReducers({
  user: userReducer,
  quiz: quizReducer,
});

export default rootReducer;
