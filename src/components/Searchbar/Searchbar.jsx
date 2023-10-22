import { useState } from 'react';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
} from './Searchbar.styled';

export const SearchBar = ({onSubmit}) => {
  const [searchName, setSearchName] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => setInputValue(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    setSearchName(inputValue.trim());
    onSubmit(searchName);
    event.target.reset();
  };

  return (
    <header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchSpan>Search</SearchSpan>
        </SearchButton>

        <SearchInput
          name="searchName"
          id="search"
          autoComplete="off"
          autoFocus
          type="text"
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
    </header>
  );
};
