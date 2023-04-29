import { Image, Message } from './GalleryFallback.styled';
import PropTypes from 'prop-types';

const GalleryFallback = ({ img, message }) => {
  return (
    <div>
      <Image src={img} width="400" alt="totoro" />
      <Message>{message}</Message>
    </div>
  );
};

export default GalleryFallback;

GalleryFallback.propTypes = {
  img: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
