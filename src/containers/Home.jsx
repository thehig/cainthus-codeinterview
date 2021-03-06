import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { formValueSelector } from 'redux-form';

import PropTypes from 'prop-types';
import * as actions from '../redux/common/actions';
import { FlickrSearch } from '../components/index';

class Home extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    searchFormValue: PropTypes.string,
  };

  constructor(props){
    super(props);

    // this.clickButton = this.clickButton.bind(this);
    this.fetchFlickr = this.fetchFlickr.bind(this);
    this.fetchMoreFlickr = this.fetchMoreFlickr.bind(this);
    this.dismissFetchFlickError = this.dismissFetchFlickError.bind(this);
  };

  // clickButton(){
  //   return this.props.actions.sampleAction();
  // };

  fetchFlickr(evt){
    evt.preventDefault();
    const { searchFormValue } = this.props;
    return this.props.actions.fetchFlickr(searchFormValue);
  };

  fetchMoreFlickr(){    
    const tags = this.props.data.get('fetchFlickrTags');
    const fromIndex = this.props.data.get('fetchFlickerFromIndex');

    // console.log("Fetching", tags, fromIndex);
    return this.props.actions.fetchFlickr(tags, fromIndex + 1);
  }

  dismissFetchFlickError(){
    return this.props.actions.dismissFetchFlickrError();
  };

  render() {
    // const counter = this.props.data.get('counter');
    const fetchFlickrError = this.props.data.get('fetchFlickrError');
    const fetchFlickrPending = this.props.data.get('fetchFlickrPending');
    const fetchFlickrResults = this.props.data.get('fetchFlickrResults');

    return (
      <div>
        <h1>Home</h1>
        {/* <button onClick={this.clickButton}>Click ({counter})</button> */}

        <FlickrSearch
          error={fetchFlickrError}
          pending={fetchFlickrPending}
          results={fetchFlickrResults}
          handleSearchSubmit={this.fetchFlickr}
          fetchMoreAction={this.fetchMoreFlickr}
          dismissAction={this.dismissFetchFlickError}
        />
      </div>
    );
  };
};

const flickrSearchSelector = formValueSelector('flickrSearch');

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    data: state.data,
    searchFormValue: flickrSearchSelector(state, 'search'),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
