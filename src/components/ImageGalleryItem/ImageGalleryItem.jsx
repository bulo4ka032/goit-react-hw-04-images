import { Component } from 'react';
import { Modal } from '../index.js';
import { ImageContainer, Image } from './ImageGalleryItem.styled.jsx';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { isModalOpen } = this.state;
    const { toggleModal } = this;

    return (
      <ImageContainer>
        <Image
          src={webformatURL}
          alt={tags}
          width="500"
          loading="lazy"
          onClick={toggleModal}
        />

        {isModalOpen && (
          <Modal closeModal={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </ImageContainer>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
