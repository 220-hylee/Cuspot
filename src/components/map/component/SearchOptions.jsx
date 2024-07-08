import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import '../CSS/Map.css';
import { cuspotBlue } from '../../../assets/Colors';

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

  // 종목별 태그 선택버튼
  return (
    // <div className="tag-options" style={{ color: '#333', margin: '0' }}>
    <div className="tag-options" style={{ margin: '0' }}>
      {options.map((option, index) => (
        <Button
          key={index}
          variant={selectedOption === option ? 'contained' : 'primary'}
          size="small"
          onClick={() => handleOptionButtonClick(option)}
          style={{ 
            backgroundColor: '#F0F0F0', 
            border: '1px solid #ccc', 
            color: '#333', 
            margin: '5px' // Adjust margin to reduce spacing
          }}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

//거리별 아이콘 선택 
export const SearchRadiusOptions = ({ selectedRadius, handleRadiusButtonClick }) => {
  return (
    <div className="options-container" style={{ margin: '0' }}>
      <div className="button-options" style={{ margin: '0' }}>
        <Button 
          variant={selectedRadius === "" ? 'contained' : 'primary'}
          size="small"
          onClick={() => handleRadiusButtonClick("")}
          style={{ 
            backgroundColor: '#F0F0F0', 
            border: '1px solid #ccc', 
            color: '#2453B3', 
            margin: '5px' // Adjust margin to reduce spacing
          }}
        >
          ALL
        </Button>
        {["500", "1000", "1500", "2000"].map((radius, index) => (
          <Button
            key={index}
            size="small"
            variant={selectedRadius === radius ? 'contained' : 'primary'}
            color="primary"
            onClick={() => handleRadiusButtonClick(radius)}
            style={{ 
              backgroundColor: '#F0F0F0', 
              border: '1px solid #black', 
              color: '#2453B3', 
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




