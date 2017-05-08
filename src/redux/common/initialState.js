import Immutable from 'immutable';

const initialState = Immutable.Map({
  counter: 0,

  fetchFlickrError: null,
  fetchFlickrPending: false,
  fetchFlickrResults: null
});

export default initialState;
