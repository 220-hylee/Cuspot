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
    width: '100%',
    '& .MuiInputBase-input': {
      color: 'white',
    }
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
        <TextField
          className={classes.searchBar}
          placeholder="검색을 입력하세요"
          variant="filled"
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
            options={["축구", "배드민턴", "헬스", "야구", "테니스", ]} // 검색 태그 추가 후 MapService에서 마커 이미지 추가
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleCheckboxChange} 
          />
        </div>
      )}
    </>
  );
};

export default SearchForm;
