import redux_types from "./action.type";
type action = { type: string, payload: any }

const STATE: any = {
    toggles: {
        settings: false,
        share: false
    }
}

const { TOGGLE_SETTING, TOGGLE_SHARE } = redux_types;

export default function reducer(state = STATE, action: action) {
    const { type, payload } = action;
    switch (type) {
        case TOGGLE_SETTING: return { ...state, toggles: { ...state.toggles, settings: payload } }
        case TOGGLE_SHARE: return { ...state, toggles: { ...state.toggles, share: payload } }
        default: return state;
    }

}

// ISC
// store.dispatch({ type: "string", payload: "any" })