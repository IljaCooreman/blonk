import React, { Component } from 'react';
import './App.css';
import AuthContainer from './AuthContainer';
import AuthenticatedContainer from './AuthenticatedContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      satelliteId: '',
    }
    this.setAuthenticated = this.setAuthenticated.bind(this);
  }

  setAuthenticated(authData) {
    console.log(authData)
    this.setState({ token: authData.token });
  }
  render() {
    const { token, satelliteId } = this.state;
    return (
      <div className="App">
        {
          this.state.token ?
            <AuthenticatedContainer token={token} satelliteId={satelliteId} /> :
            <AuthContainer setAuthenticated={this.setAuthenticated} />
        }
      </div>
    );
  }
}

export default App;
