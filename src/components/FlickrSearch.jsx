import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { FlickrInfiniteScroller, SearchForm } from './index';

class FlickrSearch extends PureComponent {
  static propTypes = {
    error: PropTypes.object,
    pending: PropTypes.bool.isRequired,
    handleSearchSubmit: PropTypes.func.isRequired,
    fetchMoreAction: PropTypes.func.isRequired,
    dismissAction: PropTypes.func.isRequired,
    results: ImmutablePropTypes.map,
  };

  render(){
    const {
        error,
        pending,
        results,
        handleSearchSubmit,
        dismissAction,
        fetchMoreAction,
    } = this.props;


    const hasError = !!error;
    const errorMsg = hasError ? error.get('error') : "";

    return (
        <div>
            <SearchForm pending={pending} handleSubmit={handleSearchSubmit} />

            { hasError &&
                <div>
                    Error: { errorMsg }
                    <button onClick={dismissAction}>Dismiss</button>
                </div>
            }

            { results && 
                <div>
                    Results:
                    <ul>
                        <li>Page: {results.get('page')}</li>
                        <li>Pages: {results.get('pages')}</li>
                        <li>Per Page: {results.get('perpage')}</li>
                        <li>Total: {results.get('total')}</li>
                    </ul>

                    <FlickrInfiniteScroller 
                            photos={results.get('photos')} 
                            fetchMoreAction={fetchMoreAction} 
                            hasMore={results.get('page') < results.get('pages')}
                    />
                </div>
            }
        </div>
    );
  };
};


export default FlickrSearch;
