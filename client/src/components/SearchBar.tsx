import React, { useState } from 'react';

const SearchBar = ({ setBusqueda }) => {
  const handleInputChange = event => {
    const searchQuery = event.target.value;
    setBusqueda(searchQuery);
  };

  return (
    <div className='flex justify-between items-center mb-8'>
      <fieldset className='w-full'>
        <legend className='mb-2 text-blue-600 uppercase text-xl font-bold'>buscar</legend>
        <div className='flex w-full'>
          <input
            type="search"
            name="busqueda"
            id="busqueda"
            className='bg-white p-2 outline-none border-x border-y focus:border-blue-600 w-full'
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default SearchBar;
