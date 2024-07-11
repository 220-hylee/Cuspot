// import React, { useState } from 'react';
// import { Button, IconButton, TextField } from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";
// import MoreIcon from '@material-ui/icons/MoreVert';
// import { makeStyles } from "@material-ui/core/styles";
// import { SearchOptions, SearchRadiusOptions } from "./SearchOptions";


// const useStyles = makeStyles((theme) => ({
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   toolbar: {
//     minHeight: 128,
//     alignItems: 'flex-start',
//     paddingTop: theme.spacing(1),
//     paddingBottom: theme.spacing(2),
//   },
  
//   searchBar: {
//     width: '80%', //입력창 너비
//     height: "34px", //입력창 높이
//     padding : "10px", //커서가 안으로 들어가게
//     marginLeft: theme.spacing(1), // 입력창 옆에 여백생기게
//     border : 'none',
//     backgroundColor: 'white',
//     '& .MuiInputBase-input': {
//       color: 'black',
//     },
//     '& .MuiOutlinedInput-root': {
//       '&.Mui-focused fieldset': {
//         border: 'none',
//       },
//     },
//   },
// }));

// const SearchForm = ({ handleSearchSubmit, handleRadiusChange, handleCheckboxChange, selectedOptions }) => {
//   const classes = useStyles();
//   const [input, setInput] = useState(""); // 검색어 입력 상태 관리
//   const [showOptions, setShowOptions] = useState(false); // 옵션 펼침 상태 관리
//   const [selectedRadius, setSelectedRadius] = useState(""); // 선택된 검색 반경 관리

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSearchSubmit(input); // 검색어 전달
//   };

//   const toggleOptions = () => {
//     setShowOptions(!showOptions);
//   };

//   const handleRadiusButtonClick = (radius) => {
//     setSelectedRadius(prevRadius => prevRadius === radius ? "" : radius);
//     handleRadiusChange(radius);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="search-bar">
//         <input
//           className={classes.searchBar}
//           placeholder="운동하시는 장소와 종목을 함께 입력해보세요 :D"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <IconButton aria-label="search" color="inherit" type='submit'>
//           <SearchIcon />
//         </IconButton>
//         <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={toggleOptions}>
//           <MoreIcon />
//         </IconButton>
//       </form>

//       {showOptions && (
//         <div className="options-container">
//           <SearchRadiusOptions
//             selectedRadius={selectedRadius}
//             handleRadiusButtonClick={handleRadiusButtonClick}
//           />
//           <SearchOptions
//             options={["축구", "배드민턴", "헬스", "야구", "테니스", "농구", "배구" ]} // 검색 태그 추가 후 MapService에서 마커 이미지 추가
//             handleSearchSubmit={handleSearchSubmit}
//             handleCheckboxChange={handleCheckboxChange} 
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default SearchForm;

import React, { useState } from 'react';
import { Button, IconButton, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from "@material-ui/core/styles";
import { SearchOptions, SearchRadiusOptions } from "./SearchOptions";
// import Map from "./Map";


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
    width: '100%', /* 검색 폼 너비에 맞게 설정 */
    display: 'flex', /* Flexbox 사용 */
    flexWrap: 'wrap', /* 필요 시 여러 줄로 나눌 수 있습니다 */
    justifyContent: 'space-around', /* 각 요소 사이의 간격을 설정합니다 */
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

const SearchForm = ({ handleSearchSubmit, handleRadiusChange, handleCheckboxChange }) => {
  const classes = useStyles();
  const [input, setInput] = useState(""); // 검색어 입력 상태 관리
  const [showOptions, setShowOptions] = useState(false); // 옵션 펼침 상태 관리
  const [selectedRadius, setSelectedRadius] = useState(""); // 선택된 검색 반경 관리
  const [selectedOptions , setSelectedOptions] = useState([]); // 선택된 종목 상태 관리

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


  // const handleOptionChange = (option) => {
  //   setSelectedOptions(prevOptions => {
  //     if (prevOptions.includes(option)) {
  //       return prevOptions.filter(opt => opt !== option);
  //     } else {
  //       return [...prevOptions, option];
  //     }
  //   });
  // };  

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
        <div className="optionsContainer">
          <SearchRadiusOptions
            selectedRadius={selectedRadius}
            handleRadiusButtonClick={handleRadiusButtonClick}
          />
          {/* 배열상태가 아니면 에러 */}
          <SearchOptions 
            options={["축구", "배드민턴", "헬스", "야구", "테니스", "배구", "농구"]}
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleOptionChange} 
          />
          {/* <SearchOptions
            options={["축구"]}
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleOptionChange} 
          />
          <SearchOptions
            options={["배드민턴"]}
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleOptionChange} 
          />
          <SearchOptions
            options={["헬스"]}
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleOptionChange} 
          />
          <SearchOptions
            options={["야구"]}
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleOptionChange} 
          />
          <SearchOptions
            options={["테니스"]}
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleOptionChange} 
          />
          <SearchOptions
            options={["배구"]}
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleOptionChange} 
          />
          <SearchOptions
            options={["농구"]}
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleOptionChange} 
          /> */}
        </div>
      )}
    </>
  );
};

export default SearchForm;

