import { useState, useEffect } from 'react';
import {
  SearchBar,
  Loader,
  fetchImages,
  Button,
  ImageGallery,
  GalleryFallback,
} from './index.js';
import { Container } from './App.styled.jsx';
import startPic from '../images/totoro.png';
import errorPic from '../images/error.png';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('start');

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    setStatus('pending');

    const fetchData = async () => {
      const { totalHits, hits } = await fetchImages(query, page);

      if (totalHits === 0) {
        setIsLoading(false);
        setStatus('nothing');
        return;
      }

      setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
      setTotalHits(prevTotalHits =>
        page === 1 ? totalHits - hits.length : prevTotalHits - hits.length
      );

      setIsLoading(false);
    };

    fetchData().catch(error => {
      setStatus('error');
    });
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const handleQuerySubmit = query => {
    setPage(1);
    setImages([]);
    setIsLoading(false);
    setTotalHits(0);
    setQuery(query);
  };

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
          message={`Oops! Something went wrong!`}
        />
      )}
      {images && <ImageGallery images={images} />}
      {!!totalHits && <Button onLoadMore={handleLoadMore} />}
      {isLoading && <Loader />}
    </Container>
  );
};
