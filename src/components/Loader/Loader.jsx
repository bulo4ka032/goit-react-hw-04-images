import { InfinitySpin } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderContainer>
      <InfinitySpin
        width="200"
        color="#BA90C6"
        wrapperStyle={{ justifyContent: 'center' }}
        visible={true}
      />
    </LoaderContainer>
  );
};

export default Loader;
