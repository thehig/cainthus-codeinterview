import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import InfiniteScroll from 'react-infinite-scroller';


class FlickrInfiniteScroller extends PureComponent {
  static propTypes = {
    photos: ImmutablePropTypes.list.isRequired,
    fetchMoreAction: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(...args){
    console.log("LOAD MORE");
    this.props.fetchMoreAction();
  }

  render(){
    const {
      photos,
    } = this.props;

    return (
      <div>
        <h3>Results</h3>
        <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={true}
            loader={<div className="loader">Loading ...</div>}
        >
            <ul>
              { photos.map((p, index) => <li key={index} ><img className="fixed-height-search-result" src={p.get('url')} alt={p.get('title')} /></li> ) }
            </ul>
        </InfiniteScroll>
      </div>
    );
  };
}

export default FlickrInfiniteScroller;
