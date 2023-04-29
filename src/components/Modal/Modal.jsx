import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEsc);
  }

  onEsc = evt => {
    if (evt.code !== 'Escape') {
      return;
    }
    this.props.closeModal();
  };

  onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
