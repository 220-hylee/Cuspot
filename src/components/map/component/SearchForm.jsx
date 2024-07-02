import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({

  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  searchBar: {
    width: '100%',
}  
}));



const SearchForm = ({ handleSearchSubmit, handleRadiusChange }) => {
  const classes = useStyles();
  
  // State 정의
  const [input, setInput] = useState(""); // 검색어 입력 상태 관리
  const [showOptions, setShowOptions] = useState(false); // 옵션 펼침 상태 관리
  const [selectedRadius, setSelectedRadius] = useState("1000"); // 선택된 검색 반경 관리
  const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 옵션들 관리


  
  // 검색어 제출 시 처리
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(input, selectedOptions); // 검색어와 선택된 옵션들 전달
  };

  // 옵션 펼침/접기 토글
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // 검색 반경 변경 시 처리
  const onRadiusChange = (e) => {
    const radius = e.target.value;
    setSelectedRadius(radius);
    handleRadiusChange(radius);
  };

  // 옵션 체크박스 클릭 처리
  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(prevOptions => prevOptions.filter(item => item !== option));
    } else {
      setSelectedOptions(prevOptions => [...prevOptions, option]);
    }
  };

  return (
    
    <div>
       {/* 검색어 입력 폼 */}   
      <form onSubmit={onSubmit} className="search-bar">
        <TextField
            className={classes.searchBar}
            placeholder="검색을 입력하세요"
            variant="outlined"
            onChange={(e) => setInput(e.target.value)}
        />
        {/* 검색 버튼 및 옵션 토글 버튼 */}
          <IconButton aria-label="search" color="inherit" type='submit'>
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={toggleOptions}>
            <MoreIcon />
          </IconButton>
      </form>

      {/* 옵션 펼침 상태일 때 옵션 컨테이너 표시 */}
      {showOptions && (
        <div className="options-container">
          {/* 검색 반경 선택 */}
          <label>
            검색 반경:
            <select value={selectedRadius} onChange={onRadiusChange}>
            <option value="">전체</option>
              <option value="500">500m</option>
              <option value="1000">1km</option>
              <option value="1500">1.5km</option>
              <option value="2000">2km</option>
            </select>
          </label>

          {/* 옵션 체크박스들 */}
          <div className="checkbox-options">
            {["배드민턴", "축구", "야구", "풋볼"].map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox 
                    checked={selectedOptions.includes(option)} 
                    onChange={() => handleCheckboxChange(option)} 
                    color="primary"
                  />
                }
                label={option}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
