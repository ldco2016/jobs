import { FETCH_JOBS } from "../actions/types";

const INITIAL_STATE = {
  listing: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_JOBS:
      const { listings } = action.payload;
      return { ...state, listing: listings.listing };
    default:
      return state;
  }
}
