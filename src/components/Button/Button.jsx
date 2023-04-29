import { LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onLoadMore }) => {
  return (
    <LoadMoreBtn type="button" onClick={onLoadMore}>
      Load More
    </LoadMoreBtn>
  );
};

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
