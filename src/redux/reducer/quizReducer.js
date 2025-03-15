import { SET_LIST_DATA } from "../action/quizAction";

const initialState = {
  listData: [],
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_DATA:
      return {
        ...state,
        listData: action.payload,
      };
    default:
      return state;
  }
};

export default quizReducer;
