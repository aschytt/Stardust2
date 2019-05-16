// ./src/SendMessageForm.js

import React, { Component } from 'react'

class SendMessageForm extends Component {
  state = {
    text: ''
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSend(this.state.text)
    this.setState({ text: '' })
  }

  onChange = e => {
    this.setState({ text: e.target.value })
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  render() {
    return (
      <div className="send-message-form-container">
        <form onSubmit={this.onSubmit} className="send-message-form">
          <input
            id = "message-field"
            type="text"
            onChange={this.onChange}
            value={this.state.text}
            className="message-input"
          ></input>
          
          
          <button id = "send-message-button" color="blue" type="submit">
            Send
          </button>
        </form>
      </div>
    )
  }
}


export default SendMessageForm