import { Component } from 'react';
import {
  SearchBar,
  Loader,
  fetchImages,
  Button,
  ImageGallery,
  GalleryFallback,
} from './index.js';
import { Container } from './App.styled.jsx';
import startPic from '../images/start.png';
import errorPic from '../images/error.png';

let message = '';

export class App extends Component {
  state = {
    searchText: '',
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
    status: 'start',
  };
  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true, status: 'pending' });

        const { totalHits, hits } = await fetchImages(query, page);

        if (totalHits === 0) {
          // toast.error('Nothing was found for your request');
          this.setState({ isLoading: false, status: 'nothing' });
          return;
        }

        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],

          totalHits:
            page === 1
              ? totalHits - hits.length
              : totalHits - [...prevState.images, ...hits].length,
        }));

        this.setState({ isLoading: false });
      } catch (error) {
        this.setState({ status: 'error' });
        message = error;
        // toast.error(`Oops! Something went wrong! ${error}`);
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleQuerySubmit = query => {
    this.setState({ query, page: 1 });
  };

  render() {
    const { images, totalHits, isLoading, status } = this.state;
    const { handleQuerySubmit, handleLoadMore } = this;

    return (
      <Container>
        <SearchBar onSubmit={handleQuerySubmit} />
        {status === 'start' && (
          <GalleryFallback img={startPic} message={'Try to find a photo!'} />
        )}
        {status === 'nothing' && (
          <GalleryFallback
            img={errorPic}
            message={'Oops, nothing was found for your request'}
          />
        )}
        {status === 'error' && (
          <GalleryFallback
            img={errorPic}
            message={`Oops! Something went wrong! ${message}`}
          />
        )}
        {images && <ImageGallery images={images} />}
        {!!totalHits && <Button onLoadMore={handleLoadMore} />}
        {isLoading && <Loader />}
      </Container>
    );
  }
}
