import React from 'react';
import { textVariants } from '../config/textVariants';

const SearchBar = ({ filter, handleInputChange }) => {
  return (
    <input
      className='textField text-left'
      type='text'
      placeholder={textVariants['placeholder']}
      value={filter}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
