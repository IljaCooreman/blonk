import React, { Component } from 'react'
import CircleButton from './CircleButton';
import { postData } from '../lib/post';

export default class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { token: this.createEmptyToken(), delay: 800, authenticated: false };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.validateAuthData = this.validateAuthData.bind(this);
  }

  createEmptyToken() {
    return new Array(9).fill(0);
  }

  handleButtonClick(i) {
    const newToken = [...this.state.token];
    newToken[i] = this.state.token[i] === 1 ? 0 : 1;
    this.setState({ token: newToken });
    this.sendRequest(newToken);
  }

  sendRequest(token) {
    postData('http://localhost:9000/auth', { entryCode: token })
      .then(this.validateAuthData);
  };

  async validateAuthData(response) {
    if (!response.ok) return;
    const data = await response.json();
    console.log(data)
    if (!data || !data.satelliteId || !data.token) return;
    this.setState({
      authenticated: true,
    })
    setTimeout(() => {
      this.props.setAuthenticated({ token: data.token, satelliteId: data.satelliteId });
    }, this.state.delay);
  }

  handleSendClick(e) {
    e.preventDefault();
    console.log('send data');
    this.sendRequest(this.state.token)
    this.setState({ token: this.createEmptyToken() });
  }

  render() {
    const { token, authenticated } = this.state;
    return (
      <div className={`circle-button-container`}>
        {
          token.map((selected, i) => <CircleButton key={i} index={i} selected={selected} authenticated={authenticated} handleClick={this.handleButtonClick} />)
        }
        {/* <button onClick={this.handleSendClick}>send</button> */}
      </div>
    )
  }
}
