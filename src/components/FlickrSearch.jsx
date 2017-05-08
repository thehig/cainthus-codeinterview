import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FlickrSearch extends PureComponent {
  static propTypes = {
    error: PropTypes.object,
    pending: PropTypes.bool.isRequired,
    fetchAction: PropTypes.func.isRequired,
    dismissAction: PropTypes.func.isRequired,
  };

  render(){
    const {
        error,
        pending,
        fetchAction,
        dismissAction,
        results,
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

                    <ul>
                        { results.get('photos').map( 
                            (p, index) => <img src={p.get('url')} key={index} alt={p.get('title')} />
                        ) }
                    </ul>
                </div>
            }
        </div>
    );
  };
};


export default FlickrSearch;
