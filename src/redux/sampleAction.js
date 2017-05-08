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
      const counter = state.counter + 1;
      return {...state, counter};
    default:
      return state;
  }
}