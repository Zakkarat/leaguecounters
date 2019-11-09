import { CHANGE_LANG, SORTING, SEARCH, ROLES_FILTERING } from "./actions";
import { combineReducers } from "redux";

const intialState = {
  language: "en_US"
};

const filterState = {
  searchWord: "",
  sort: "",
  roles: []
};

const urlReducer = (state = intialState, action) => {
  switch (action.type) {
    case CHANGE_LANG:
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const filters = (state = filterState, action) => {
  switch (action.type) {
    case SORTING:
      state.sort = action.payload;
      return state;
    case SEARCH:
      state.searchWord = action.payload;
      return state;
    case ROLES_FILTERING:
      state.sort = [...action.payload];
      return state;
    default:
      return state;
  }
};

export default combineReducers({ urlReducer, filters });
