import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { SiPixabay } from 'react-icons/si';
import {
  Header,
  SearchForm,
  SearchInput,
  Submit,
  Pixabay,
} from './SearchBar.styled';
import PropTypes from 'prop-types';

const style = { color: 'white', fontSize: '2.0em' };

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  const handleTagChange = evt => {
    setQuery(evt.currentTarget.value.toLowerCase());
  };

  return (
    <Header>
      <Pixabay>
        <SiPixabay style={style} />
      </Pixabay>
      <SearchForm onSubmit={handleSubmit}>
        <Submit type="submit">
          <BiSearch width="20" />
        </Submit>
        <SearchInput
          placeholder="Search photos by tags"
          type="text"
          name="searchText"
          value={query}
          onChange={handleTagChange}
          required
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
