import axios from 'axios';

const searchParams = new URLSearchParams({
  key: '35064205-67d7ade1ddd64ae7932467e42',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (searchText, page) => {
  const response = await axios.get(
    `?q=${searchText}&page=${page}&${searchParams}`
  );
  const data = response.data;

  return data;
};

export default fetchImages;
