import Immutable from 'immutable';

const initialState = Immutable.Map({
  counter: 0,

  fetchFlickrError: null,
  fetchFlickrPending: false,
  fetchFlickrResults: null,
  fetchFlickrTags: "",
  fetchFlickerFromIndex: 0,
});

export default initialState;
