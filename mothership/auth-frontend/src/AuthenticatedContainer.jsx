import React, { Component } from 'react'

import WsConnect from './WsConnect';

export default class AuthenticatedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        ingelogd!!! {this.props.token}
        <div>data;{this.state.response.status}</div>
        <WsConnect token={this.props.token} />
      </div>
    )
  }
}
