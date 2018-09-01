import React, { Component } from 'react';
import './button.css'

class Button extends Component {

  render() {
    return <button className={`custom-button ${this.props.className}`} onClick={this.props.onClick} style={this.props.style}>{this.props.children}</button>;
  }
}

export default Button;