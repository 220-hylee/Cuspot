
// import React, { useState } from 'react';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { TextField, InputAdornment, IconButton } from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";
// import { makeStyles } from "@material-ui/core/styles";
// import MoreIcon from '@material-ui/icons/MoreVert';


// // 검색 버튼 css 
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
//     width: '100%',
//     '& .MuiInputBase-input': {
//       color: 'white', // 입력 텍스트 색상
//     }
//   }  
// }));



// const SearchForm = ({ handleSearchSubmit, handleRadiusChange }) => {
//   const classes = useStyles();
  
//   // State 정의
//   const [input, setInput] = useState(""); // 검색어 입력 상태 관리
//   const [showOptions, setShowOptions] = useState(false); // 옵션 펼침 상태 관리
//   const [selectedRadius, setSelectedRadius] = useState("1000"); // 선택된 검색 반경 관리
//   const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 옵션들 관리


  
//   // 검색어 제출 시 처리
//   const onSubmit = (e) => {
//     e.preventDefault();
//     handleSearchSubmit(input, selectedOptions); // 검색어와 선택된 옵션들 전달
//   };

//   // 옵션 펼침/접기 토글
//   const toggleOptions = () => {
//     setShowOptions(!showOptions);
//   };

//   // 검색 반경 변경 시 처리
//   const onRadiusChange = (e) => {
//     const radius = e.target.value;
//     setSelectedRadius(radius);
//     handleRadiusChange(radius);
//   };

//   // 옵션 체크박스 클릭 처리
//   const handleCheckboxChange = (option) => {
//     if (selectedOptions.includes(option)) {
//       setSelectedOptions(prevOptions => prevOptions.filter(item => item !== option));
//     } else {
//       setSelectedOptions(prevOptions => [...prevOptions, option]);
//     }
//   };

//   return (
    
//     <>
//        {/* 검색어 입력 폼 */}   
//       <form onSubmit={onSubmit} className="search-bar">
//       <TextField 
//         className={classes.searchBar}
//         placeholder="원하시는 종목과 장소를 입력하세요"
//         id="standard-basic" 
//         label="입력해주세요!"
//         autoComplete  
//         variant="filled"
//         borderColor="yellow"
//         onChange={(e) => setInput(e.target.value)}
//          />
//         {/* <TextField
//              className={classes.searchBar}
//             placeholder="원하시는 종목과 장소를 입력하세요"
//             autoComplete  
//             variant="filled"
//             onChange={(e) => setInput(e.target.value)}
//         /> */}
//         {/* 검색 버튼 및 옵션 토글 버튼 */}
//           <IconButton aria-label="search" color="inherit" type='submit'>
//             <SearchIcon />
//           </IconButton>
//           <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={toggleOptions}>
//             <MoreIcon />
//           </IconButton>
//       </form>

//       {/* 옵션 펼침 상태일 때 옵션 컨테이너 표시 */}
//       {showOptions && (
//         <div className="options-container">
//           {/* 검색 반경 선택 */}
//           <label>
//             검색 반경 : 
//             <select value={selectedRadius} onChange={onRadiusChange}>
//             <option value="">전체</option>
//               <option value="500">500m</option>
//               <option value="1000">1km</option>
//               <option value="1500">1.5km</option>
//               <option value="2000">2km</option>
//             </select>
//           </label>

//           {/* 옵션 체크박스들 */}
//           <div className="checkbox-options">
//             {/* {["배드민턴", "축구", "야구", "풋볼"].map((option, index) => ( */}
//             {["🏸", "⚽", "⚾", "🎾"].map((option, index) => (
//               <FormControlLabel
//                 key={index}
//                 control={
//                   <Checkbox 
//                     checked={selectedOptions.includes(option)} 
//                     onChange={() => handleCheckboxChange(option)} 
//                     color="primary"
//                   />
//                 }
//                 label={option}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SearchForm;



//----------------------------------------------------------------
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

  searchBar: {
    width: '100%',
    padding: '10px 10px', // 왼쪽 패딩 추가
    fontSize: '15px', // 폰트사이즈
    margin: '10px 0 10px 20px', // 마진 추가
    paddingBottom: theme.spacing(2),
    border: 'none', // 기본 테두리 제거
    borderBottom: '1px solid #000', // 아래쪽 테두리 추가
    borderTop: '1px solid #000', // 위쪽 테두리 추가
    outline: 'none', // 포커스 시 기본 아웃라인 제거
    height: '40px', // 입력 필드의 높이 설정
    lineHeight: '40px', // 입력 필드의 높이와 동일하게 설정

    '&:focus': {
      borderBottom: '2px solid #000', // 포커스 시 아래쪽 테두리 두껍게
    },
    '& .MuiInputBase-input': {
      color: 'white',
     }
    },
}));


//SearchOptions 컴포넌트가 옵션을 관리합니다.
// handleCheckboxChange를 통해 옵션 선택 상태를 관리합니다.

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
          type='text'
          placeholder="검색을 입력하세요"
          variant='filled'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton label="search" color="inherit" type='submit' >
          <SearchIcon />
        </IconButton>
        <IconButton 
          label="display more actions" edge="end" color="inherit" onClick={toggleOptions} style={{ marginRight: '2px' }}/>
        {/* <TextFieldn
          className={classes.searchBar}
          placeholder="검색을 입력하세요"
          variant="filled"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        /> */}
        {/* <IconButton aria-label="search" color="inherit" type='submit'>
          <SearchIcon />
        </IconButton> */}
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
            options={["축구", "배드민턴", "헬스", "야구", "테니스"]} // 검색 태그 추가 후 MapService에서 마커 이미지 추가
            handleSearchSubmit={handleSearchSubmit}
            handleCheckboxChange={handleCheckboxChange} 
          />
        </div>
      )}
    </>
  );
};

export default SearchForm;

