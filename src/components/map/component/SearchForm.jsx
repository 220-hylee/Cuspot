import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const SearchForm = ({ handleSearchSubmit, handleRadiusChange }) => {
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(false); // 검색 옵션을 보여줄지 여부를 관리하는 상태
  const [selectedRadius, setSelectedRadius] = useState("1000"); // 선택된 검색 반경을 상태로 관리
  const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 옵션을 관리하는 상태

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(input, selectedOptions); // 선택된 옵션과 함께 검색어를 전달
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions); // 검색 옵션 보이기/감추기 토글
  };

  const onRadiusChange = (e) => {
    const radius = e.target.value;
    setSelectedRadius(radius); // 선택된 반경을 업데이트
    handleRadiusChange(radius);
  };

  const handleOptionButtonClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option)); // 이미 선택된 옵션을 해제
    } else {
      setSelectedOptions([...selectedOptions, option]); // 선택되지 않은 옵션을 추가
    }
  };

  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="search-bar">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="검색어를 입력하세요" 
          className="search-input"
        />
        <button className="search-button" type="submit">검색</button>
      </div>

      <button 
        className="toggle-options" 
        type="button" 
        onClick={toggleOptions}
      >
        옵션
      </button>

      {showOptions && (
        <div className="options-container">
          <label>
            검색 반경:
            <select value={selectedRadius} onChange={onRadiusChange}>
              <option value="500">500m</option>
              <option value="1000">1km</option>
              <option value="1500">1.5km</option>
              <option value="2000">2km</option>
            </select>
          </label>

          <div>
            체크박스:
            <FormControlLabel
              control={<Checkbox checked={selectedOptions.includes("배드민턴")} onChange={() => handleOptionButtonClick("배드민턴")} />}
              label="배드민턴"
            />
            <FormControlLabel
              control={<Checkbox checked={selectedOptions.includes("축구")} onChange={() => handleOptionButtonClick("축구")} />}
              label="축구"
            />
            <FormControlLabel
              control={<Checkbox checked={selectedOptions.includes("야구")} onChange={() => handleOptionButtonClick("야구")} />}
              label="야구"
            />
            <FormControlLabel
              control={<Checkbox checked={selectedOptions.includes("풋볼")} onChange={() => handleOptionButtonClick("풋볼")} />}
              label="풋볼"
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchForm;
