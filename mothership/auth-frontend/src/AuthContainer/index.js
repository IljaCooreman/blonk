import React, { Component } from 'react'
import CircleButton from './CircleButton';
import { postData } from '../lib/requests';


export default class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { token: this.createEmptyToken(), delay: 800, authenticated: false, serverError: '' };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.validateAuthResponse = this.validateAuthResponse.bind(this);
  }

  componentDidMount() {
    this.sendRequest(this.createEmptyToken())

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
      .then(this.validateAuthResponse);
  };

  async validateAuthResponse(response) {
    if (!response.ok) {
      if (response.status >= 500 || response.status === 404) {
        console.log(response)
        response.json().then(data => {
          this.setState({ serverError: data.error });
        })
      }
      return;
    };

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
    const { token, authenticated, serverError } = this.state;
    if (serverError) return (
      <div className={`circle-button-container`}>{serverError}</div>
    );

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
