import React, { useState } from 'react';
import { Button, IconButton, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from "@material-ui/core/styles";
import { SearchOptions, SearchRadiusOptions } from "./SearchOptions";

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
    width: '80%', //입력창 너비
    height: "34px", //입력창 높이
    padding : "10px", //커서가 안으로 들어가게
    marginLeft: theme.spacing(1), // 입력창 옆에 여백생기게
    border : 'none',
    backgroundColor: 'white',
    '& .MuiInputBase-input': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
  },
}));

const SearchForm = ({ handleSearchSubmit, handleRadiusChange, handleCheckboxChange, selectedOptions }) => {
  const classes = useStyles();
  const [input, setInput] = useState(""); // 검색어 입력 상태 관리
  const [showOptions, setShowOptions] = useState(false); // 옵션 펼침 상태 관리
  const [selectedRadius, setSelectedRadius] = useState(""); // 선택된 검색 반경 관리

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit(input); // 검색어 전달
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleRadiusButtonClick = (radius) => {
    setSelectedRadius(prevRadius => prevRadius === radius ? "" : radius);
    handleRadiusChange(radius);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          className={classes.searchBar}
          placeholder="운동하시는 장소와 종목을 함께 입력해보세요 :D"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton aria-label="search" color="inherit" type='submit'>
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={toggleOptions}>
          <MoreIcon />
        </IconButton>
      </form>

      {showOptions && (
        <div className="options-container">
          <SearchRadiusOptions
            selectedRadius={selectedRadius}
            handleRadiusButtonClick={handleRadiusButtonClick}
          />
          <SearchOptions
            options={["축구", "배드민턴", "헬스", "야구", "테니스", "농구", "배구" ]} // 검색 태그 추가 후 MapService에서 마커 이미지 추가
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleCheckboxChange} 
          />
          
        </div>
      )}
    </>
  );
};

export default SearchForm;

