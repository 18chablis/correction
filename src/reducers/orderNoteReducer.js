import {
  ADD_NOTE,
  GET_NOTES,
  NOTE_LOADING,
  UPDATE_NOTE,
} from "../actions/orderNote.action";

const initialState = {
  notes: [],
  loading: false,
};

export default function orderNoteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false,
      };
    case ADD_NOTE:
    case UPDATE_NOTE:
      return [action.notes, state];
    case NOTE_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
