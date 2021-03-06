import Immutable from 'immutable';
import { CALL_API } from 'redux-api-middleware';
import { getError } from './common/utils';

import {
  FETCH_FLICKR_BEGIN,
  FETCH_FLICKR_SUCCESS,
  FETCH_FLICKR_FAILURE,
  FETCH_FLICKR_DISMISS_ERROR,
} from './common/constants';

import flickr from './common/flickr';
const endpointUrl = `${flickr.endpoint}/?method=flickr.photos.search&api_key=${flickr.apiKey}&${flickr.alwaysParameters}&tags=`;

export function fetchFlickr(searchTags, fromIndex = 1) {
  return {
    [CALL_API]: {
      endpoint: endpointUrl + encodeURIComponent(searchTags) + "&page=" + fromIndex,
      method: 'GET',
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

function parsePhotos (state, action) {
  const flickrApiResponse = action.payload;
  const { page, pages, perpage, total, photo } = flickrApiResponse.photos;

  const photos = photo.map(function(p){
    p.url = `https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`;
    return p;
  });

  const results = {
    page, // changes
    pages,
    perpage,
    total,
    photos, // changes
  };

  if(page > 1) {
    const previousPhotos = state.get('fetchFlickrResults').get('photos').toJS();
    results.photos = (previousPhotos || []).concat(photos);
  }

  // console.log("parsePhotos results", results);
  return results;
}

export function reducer(state, action) {
  switch (action.type) {
    case FETCH_FLICKR_BEGIN: {
      const beginResponse = action.error ? getError(action) : (action.payload || {});       // If error is true, then payload is a RequestError
      return state
          .set('fetchFlickrTags', action.meta.searchTags)
          .set('fetchFlickerFromIndex', action.meta.fromIndex)
          .set('fetchFlickrError', action.error ? Immutable.fromJS(getError(beginResponse)) : null)
          .set('fetchFlickrPending', !action.error);          // Set pending to inverse of error
    }
    case FETCH_FLICKR_SUCCESS: {
      return state
        .set('fetchFlickrPending', false)
        .set('fetchFlickrError', null)
        .set('fetchFlickrTags', action.meta.searchTags)
        .set('fetchFlickerFromIndex', action.meta.fromIndex)
        // Note: Append the results here, not overwrite them
        .set('fetchFlickrResults', Immutable.fromJS(parsePhotos(state, action)));
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
