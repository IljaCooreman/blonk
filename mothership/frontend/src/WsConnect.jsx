import React, { Component } from 'react'
import { createSocket } from './lib/createSocket';

export default class WsConnect extends Component {

  componentDidMount() {
    console.log(this.props.token)
    const ws = createSocket();
    ws.onmessage = message => {
      console.log(message.data)
    }
  }
  render() {
    return (
      <div>
        ws connect component:
      </div>
    )
  }
}
