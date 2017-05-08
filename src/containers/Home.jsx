import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import * as actions from '../redux/common/actions';
import { FlickrSearch } from '../components/index';

class Home extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props);

    this.clickButton = this.clickButton.bind(this);
    this.fetchFlickr = this.fetchFlickr.bind(this);
    this.dismissFetchFlickError = this.dismissFetchFlickError.bind(this);
  };

  clickButton(){
    return this.props.actions.sampleAction();
  };

  fetchFlickr(){
    return this.props.actions.fetchFlickr();
  };

  dismissFetchFlickError(){
    return this.props.actions.dismissFetchFlickError();
  };

  render() {
    const counter = this.props.data.get('counter');
    const fetchFlickrError = this.props.data.get('fetchFlickrError');
    const fetchFlickrPending = this.props.data.get('fetchFlickrPending');
    const fetchFlickrResults = this.props.data.get('fetchFlickrResults');

    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.clickButton}>Click ({counter})</button>

        <FlickrSearch
          error={fetchFlickrError}
          pending={fetchFlickrPending}
          results={fetchFlickrResults}
          fetchAction={this.fetchFlickr}
          dismissAction={this.dismissFetchFlickError}
        />
      </div>
    );
  };
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    data: state.data
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
