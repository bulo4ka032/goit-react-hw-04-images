import { useState } from 'react';
import { Modal } from '../index.js';
import { ImageContainer, Image } from './ImageGalleryItem.styled.jsx';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
