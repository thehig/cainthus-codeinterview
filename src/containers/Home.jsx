import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import * as actions from '../redux/common/actions';

class Home extends Component {
  static propTypes = {
    // accessibleState: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props);

    this.clickButton = this.clickButton.bind(this);
  };

  clickButton(){
    return this.props.actions.sampleAction();
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.clickButton}>Click</button>
      </div>
    );
  };
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    // accessibleState: state.someSubset
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
