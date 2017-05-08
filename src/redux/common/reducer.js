import initialState from './initialState';
import { reducer as sampleAction } from '../sampleAction';
import { reducer as fetchFlickr } from '../fetchFlickr';

const reducers = [
  sampleAction,
  fetchFlickr
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}