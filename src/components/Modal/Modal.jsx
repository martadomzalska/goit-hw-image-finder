import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className={css.overlay} onClick={this.props.onClose}>
        <div className={css.modal}>
          <img src={this.props.imageUrl} alt="Modal" width="800" height="600" />
        </div>
      </div>
    );
  }
}
