// src/components/map/component/ParentComponent.jsx

import React, { useState } from 'react';
import SearchOptions from './SearchOptions';
import SearchRadiusOptions from './SearchRadiusOptions';

const ParentComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedRadius, setSelectedRadius] = useState('');

  const handleSearchSubmit = (option) => {
    setInputValue(option);
  };

  const handleRadiusButtonClick = (radius) => {
    setSelectedRadius(radius);
    setInputValue(radius);
  };

  return (
    <div>
      <SearchOptions 
        options={["Soccer", "Basketball", "Tennis"]} 
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearchSubmit={handleSearchSubmit} 
      />
      <SearchRadiusOptions 
        selectedRadius={selectedRadius} 
        handleRadiusButtonClick={handleRadiusButtonClick} 
      />
      {/* Shared input field */}
      <input 
        type="text" 
        value={inputValue} 
        readOnly 
        style={{ 
          display: 'block', 
          marginTop: '10px', 
          padding: '5px', 
          border: '1px solid #ccc' 
        }}
      />
    </div>
  );
};

export default ParentComponent;