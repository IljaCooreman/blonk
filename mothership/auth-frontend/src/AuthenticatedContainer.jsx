import React, { Component } from 'react'
import { fetchData } from './lib/requests';

export default class AuthenticatedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    }
  }

  componentDidMount() {
    fetchData('http://localhost:9000', this.props.token)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)
        this.setState({
          response: data
        })
      })
  }
    
  render() {
    return (
      <div>
        ingelogd!!! {this.props.token}
        <div>data;{this.state.response.status}</div>
      </div>
    )
  }
}
