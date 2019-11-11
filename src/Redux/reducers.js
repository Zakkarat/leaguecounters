import { CHANGE_LANG, SORTING, SEARCH, ROLES_FILTERING, VOTING } from "./actions";
import { combineReducers } from "redux";

const intialState = {
  language: "en_US"
};

const intialVotes = 3;

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
      return {...state, sort: action.payload};
    case SEARCH:
      return {...state, searchWord: action.payload};
    case ROLES_FILTERING:
      return {...state, roles: [...action.payload]};
    default:
      return state;
  }
};

const votes = (state = intialVotes, action) => {
  switch (action.type) {
    case VOTING:
      state = action.payload;
      return state;
      default: 
      return state;
  }
}

export default combineReducers({ urlReducer, filters, votes });
