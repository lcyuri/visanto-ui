import React from 'react';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchProps } from '../../models/component';

const Search: React.FC<SearchProps> = ({ search }) => {
  const handleSearch = (event: any): void => {
    search(event.target.value)
  }

  return (
    <div className='search'>
      <FontAwesomeIcon icon={faSearch} className='search-icon' />
      <input
        className='search-input'
        type='text'
        placeholder='Pesquisar'
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;