import { SEND_REPORT } from "../actions/report.action";

const initialState = {
  reports: [],
};
export default function reportReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_REPORT:
      return [action.report, state];
    default:
      return state;
  }
}
