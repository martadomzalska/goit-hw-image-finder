import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
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

Modal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
}
