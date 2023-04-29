import { Component } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Header, SearchForm, SearchInput, Submit } from './SearchBar.styled';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    searchText: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.searchText.trim() === '') {
      return;
    }

    this.props.onSubmit(this.state.searchText);
    this.setState({ searchText: '' });
  };

  handleTagChange = evt => {
    this.setState({ searchText: evt.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <Submit type="submit">
            <BiSearch width="20" />
          </Submit>
          <SearchInput
            type="text"
            name="searchText"
            value={this.state.searchText}
            onChange={this.handleTagChange}
            required
          />
        </SearchForm>
      </Header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
