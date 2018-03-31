import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ActionCreators } from './actions'
import * as actions from './actions';
import _ from 'lodash';

import Screen from './Screen'

class AppContainer extends Component {
  constructor (props: any, context: any) {
    super (props, context);
  }

  render() {
    return <Screen {...this.props} />
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators (ActionCreators, dispatch);
}

const mapStateToProps = (state) => {
  const {
    activeScreen,
  } = state.navigation;

  return {
    activeScreen,
  };
}

export default connect (mapStateToProps, mapDispatchToProps)(AppContainer);
