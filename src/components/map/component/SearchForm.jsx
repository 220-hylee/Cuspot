
import React, { useState } from 'react';
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { makeStyles } from "@material-ui/core/styles";
import { SearchOptions } from "./SearchOptions";
import Style from "./Style";

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
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: '-2px',
    backgroundColor: '#fff',
    border: '2px solid #d4d4d4',
    borderRadius: '5px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    padding: '5px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  searchBar: {
    width: '80%',
    height: "34px",
    padding: "20px",
    marginLeft: theme.spacing(1),
    border: 'none',
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

const SearchForm = ({ handleSearchSubmit, handleRadiusChange, handleCheckboxChange }) => {
  const classes = Style();

  const [input, setInput] = useState(""); // 검색어 입력 상태 관리
  const [showOptions, setShowOptions] = useState(false); // 옵션 펼침 상태 관리
  const [selectedRadius, setSelectedRadius] = useState(""); // 선택된 검색 반경 관리
  const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 종목 상태 관리
  const [searchPosition, setSearchPosition] = useState(null); // 검색 위치 상태 관리


  //검색가능한 스포츠 종목을 배열로 따로 관리
  const sportsOptions = ["축구", "배드민턴", "헬스", "야구", "테니스", "배구", "농구"];
  const additionalOptions = ["레슨","축구레슨", "축구예약"]; // 추가 필터링 옵션


  const handleSubmit = (e) => {
    e.preventDefault();

    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();

    // 입력 텍스트를 지역과 스포츠 종목으로 분리
    const terms = input.split(',').map(term => term.trim());
    const sportsTerms = terms.filter(term => sportsOptions.includes(term));
    const locationTerms = terms.filter(term => !sportsOptions.includes(term) && !additionalOptions.includes(term));
    const additionalTerms = terms.filter(term => additionalOptions.includes(term));
    const locationQuery = locationTerms.join(', ');

    if (locationQuery) {
      geocoder.addressSearch(locationQuery, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const newSearchPosition = {
            lat: result[0].y,
            lng: result[0].x
          };
          setSearchPosition(newSearchPosition);
          handleSearchSubmit(input, sportsTerms, newSearchPosition);
        } else {
          alert('지역을 먼저 검색하신 후 종목을 선택해주세요!👨🏻');
        }
      });
    } else {
      handleSearchSubmit(input, sportsTerms, null);
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleRadiusButtonClick = (radius) => {
    setSelectedRadius(prevRadius => prevRadius === radius ? "" : radius);
    handleRadiusChange(radius);
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prevOptions => {
      if (prevOptions.includes(option)) {
        const newOptions = prevOptions.filter(opt => opt !== option);
        updateInputWithOptions(newOptions);
        return newOptions;
      } else {
        const newOptions = [...prevOptions, option];
        updateInputWithOptions(newOptions);
        return newOptions;
      }
    });
  };

  const updateInputWithOptions = (options) => {
    const optionsString = options.join(", ");
    setInput(optionsString);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search-bar">
      <input
          className={classes.search__bar}
          placeholder="➡️지역을 검색한 후, 옵션에 들어가 종목을 선택해주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // {(e) => setInput(e.target.value)}는 입력 필드의 새 값으로 상태 변수 input을 업데이트하는 함수입니다.
        />
        <IconButton aria-label="search" color="inherit" type='submit'>
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="display more actions" 
        edge="end" 
        color="inherit" 
        onClick={toggleOptions}
        style={{marginRight: '1px'}}>
        <AddRoundedIcon />
        </IconButton>
      </form>


      {showOptions && (
        <div className={classes.optionsContainer}>
          <SearchOptions 
            options={[...sportsOptions, ...additionalOptions]}
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleOptionChange}
          />
        </div>
      )}
    </>
  );
};

export default SearchForm;
