import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import '../CSS/Map.css';

export const SearchOptions = ({ options, handleSearchSubmit, handleCheckboxChange }) => {
  const [selectedOption, setSelectedOption] = useState(""); 

  const handleOptionButtonClick = (option) => {
    if (selectedOption === option) {
      setSelectedOption("");
      handleSearchSubmit(""); // 다시 선택시 빈 문자열로 검색
    } else {
      setSelectedOption(option);
      handleSearchSubmit(option);
    }   
// handleCheckboxChange(option); // 옵션 선택시 위쪽에 표시
  };

  return (
    <div className="tag-options" style={{ color: '#333', margin: '0' }}>
      {options.map((option, index) => (
        <Button
          key={index}
          variant={selectedOption === option ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleOptionButtonClick(option)}
          style={{ 
            backgroundColor: 'transparent', 
            border: '1px solid #ccc', 
            color: '#333', 
            margin: '5px 5px 5px 0' // Adjust margin to reduce spacing
          }}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export const SearchRadiusOptions = ({ selectedRadius, handleRadiusButtonClick }) => {
  return (
    <div className="options-container" style={{ margin: '0' }}>
      <div className="button-options" style={{ margin: '0' }}>
        <Button
          variant={selectedRadius === "" ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleRadiusButtonClick("")}
          style={{ 
            backgroundColor: 'transparent', 
            border: '1px solid #ccc', 
            color: '#333', 
            margin: '5px 5px 5px 0' // Adjust margin to reduce spacing
          }}
        >
          전체
        </Button>
        {["500", "1000", "1500", "2000"].map((radius, index) => (
          <Button
            key={index}
            variant={selectedRadius === radius ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleRadiusButtonClick(radius)}
            style={{ 
              backgroundColor: 'transparent', 
              border: '1px solid #ccc', 
              color: '#333', 
              margin: '5px 5px 5px 0' // Adjust margin to reduce spacing
            }}
          >
            {radius}m
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchOptions;




