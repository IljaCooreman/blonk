import React, { Component } from 'react'
import { createSocket, handshake } from './lib/createSocket';

export default class WsConnect extends Component {

  componentDidMount() {
    console.log(this.props.token)
    const ws = createSocket();
    handshake(ws);
    ws.on('message', function incoming(data) {
      console.log(data);
    });

    ws.on('error', (error) => {
      console.log(error)
    })
  }
  render() {
    return (
      <div>
        bollen hier
      </div>
    )
  }
}
