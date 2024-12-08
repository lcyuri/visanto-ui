import React from 'react';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchProps } from '../../models/component';

const Search: React.FC<SearchProps> = ({ search }) => {
  const handleSearch = (event: any): void => {
    search(event.target.value);
  }

  return (
    <div className='search'>
      <input
        type='text'
        id="search-input"
        placeholder=" " // Para o label funcionar, usamos um placeholder vazio
        onChange={handleSearch}
      />
      <label htmlFor="search-input" className="search-label">
        Pesquisar
      </label>
      <FontAwesomeIcon icon={faSearch} className='search-icon' />
    </div>
  );
};

export default Search;
