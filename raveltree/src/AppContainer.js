import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ActionCreators } from './actions'
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

function mapStateToProps (state) {
  return {
    //activeScreen: state.activeScreen,
  };
}

export default connect (mapStateToProps, mapDispatchToProps)(AppContainer);
