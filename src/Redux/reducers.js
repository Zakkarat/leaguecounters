import { CHANGE_LANG } from "./actions"

const intialState = {
    language: "en_US",
}

const urlReducer = (state = intialState, action) => {
    switch (action.type) {
        case CHANGE_LANG:
                state = action.payload;
            return state;
        default:
            return state;
    }
}

export default urlReducer;