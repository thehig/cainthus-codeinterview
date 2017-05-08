import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { FlickrInfiniteScroller } from './index';

class FlickrSearch extends PureComponent {
  static propTypes = {
    error: PropTypes.object,
    pending: PropTypes.bool.isRequired,
    fetchAction: PropTypes.func.isRequired,
    fetchMoreAction: PropTypes.func.isRequired,
    dismissAction: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.fetchMoreAction = this.fetchMoreAction.bind(this);
  }

  fetchMoreAction () {
    // console.log("FlickrSearch.jsx", "fetchMoreAction");
    this.props.fetchMoreAction();
  }

  render(){
    const {
        error,
        pending,
        results,
        fetchAction,
        dismissAction,
    } = this.props;


    const hasError = !!error;
    const errorMsg = hasError ? error.get('error') : "";

    return (
        <div>
            FlickrSearch
            <button onClick={fetchAction} >{ pending ? "Pending" : "Fetch" }</button>

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
                            fetchMoreAction={this.fetchMoreAction} 
                            hasMore={results.get('page') < results.get('pages')}
                    />
                </div>
            }
        </div>
    );
  };
};


export default FlickrSearch;
