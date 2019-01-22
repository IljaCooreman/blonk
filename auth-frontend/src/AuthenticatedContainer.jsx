import React, { Component } from 'react'

export default class AuthenticatedContainer extends Component {
  render() {
    return (
      <div>
        ingelogd!!! {this.props.token}
      </div>
    )
  }
}
