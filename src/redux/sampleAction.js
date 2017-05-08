import {
  SAMPLE_ACTION,
} from './common/constants';

// Action Creator
export function sampleAction() {
  return {
    type: SAMPLE_ACTION,
  };
}

// Action Reducer
export function reducer(state, action) {
  switch (action.type) {
    case SAMPLE_ACTION:
      // Perform state action here
      return state;
    default:
      return state;
  }
}