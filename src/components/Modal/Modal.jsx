import { Component } from 'react';

export class Modal extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div class="overlay">
        <div class="modal" onClick={this.props.onClose}>
           <img src={this.props.imageUrl} alt="Modal" />
        </div>
      </div>
    );
  }
}
