import Immutable from 'immutable';
import { CALL_API } from 'redux-api-middleware';
import { getError } from './common/utils';

import {
  FETCH_FLICKR_BEGIN,
  FETCH_FLICKR_SUCCESS,
  FETCH_FLICKR_FAILURE,
  FETCH_FLICKR_DISMISS_ERROR,
} from './common/constants';

const url = "";

export function fetchFlickr(searchTags, fromIndex = 0) {
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      types: [
        {
          type: FETCH_FLICKR_BEGIN,
          meta: {
            searchTags,
            fromIndex
          },
        },
        {
          type: FETCH_FLICKR_SUCCESS,
          meta: {
            searchTags,
            fromIndex
          },
        },
        {
          type: FETCH_FLICKR_FAILURE,
          meta: {
            searchTags,
            fromIndex
          },
        }
      ]
    }
  };
}

export function dismissFetchFlickrError() {
  return {
    type: FETCH_FLICKR_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FETCH_FLICKR_BEGIN: {
      const beginResponse = action.error ? getError(action) : (action.payload || {});       // If error is true, then payload is a RequestError
      return state
          .set('fetchFlickrError', action.error ? Immutable.fromJS(getError(beginResponse)) : null)
          .set('fetchFlickrPending', !action.error);          // Set pending to inverse of error
    }
    case FETCH_FLICKR_SUCCESS: {
      return state
        .set('fetchFlickrPending', false)
        .set('fetchFlickrError', null)
        .set('flickrResults', Immutable.fromJS(action.payload));
    }
    case FETCH_FLICKR_FAILURE: {
      const failResponse = getError(action);
      return state
        .set('fetchFlickrPending', false)
        .set('fetchFlickrError', Immutable.fromJS(failResponse));
    }
    case FETCH_FLICKR_DISMISS_ERROR:
      return state.set('fetchFlickrError', null);
    default:
      return state;
  }
}
