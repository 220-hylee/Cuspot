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
//   // toolbar: {
//   //   minHeight: 128,
//   //   alignItems: 'flex-start',
//   //   paddingTop: theme.spacing(1),
//   //   paddingBottom: theme.spacing(2),
//   // },
//   searchBar: { //여기는 입력창 부분
//     width: '100%',
//     padding: '10px 10px', // 왼쪽 패딩 추가
//     fontSize: '15px', // 폰트사이즈
//     margin: '10px 0 10px 10px', // 마진 추가
//     paddingBottom: theme.spacing(2),
//     border: 'none', // 기본 테두리 제거
//     // borderBottom: '1px solid #000', // 아래쪽 테두리 추가
//     borderTop: '1px solid #000', // 위쪽 테두리 추가
//     outline: 'none', // 포커스 시 기본 아웃라인 제거
//     height: '42px', // 입력 필드의 높이 설정
//     // lineHeight: '42px', // 입력 필드의 높이와 동일하게 설정

//     // width: '90%',
//     // height: '40px',
//     // fontSize: '14px',
//     // marginLeft: theme.spacing(1),
//     // paddingLeft: theme.spacing(2),
//     // '& .MuiInputBase-input': {
//     //   color: 'white',
//     // }
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
//           type='text'
//           placeholder="검색을 입력하세요"
//           variant='filled'
//           value={input}
//           // value={inputValue} 
//           onChange={(e) => setInput(e.target.value)}
//         />
//         {/* <IconButton label="search" color="inherit" type='submit' >
//           <SearchIcon />
//         </IconButton>
//         <IconButton 내거
//           label="display more actions" edge="end" color="inherit" onClick={toggleOptions} style={{ marginRight: '2px' }}/>
//         <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={toggleOptions}>
//           <MoreIcon />
//         </IconButton> */}

//         <IconButton aria-label="search" color="inherit" type='submit'>
//           <SearchIcon />
//         </IconButton>
//         <IconButton aria-label="display more actions" edge="center" color="inherit" onClick={toggleOptions}>
//           <MoreIcon />
//         </IconButton>

//       </form>


//       {/* {showOptions && (
//         <div className="options-container">
//           <SearchRadiusOptions
//             selectedRadius={selectedRadius}
//             handleRadiusButtonClick={handleRadiusButtonClick}
//           />

//           <div className="sports">
//            <SearchOptions 
//             options={["#축구⚽", "#배드민턴🏸", "#Gym🏋🏻‍♂️", "#배구🏐", "#테니스🎾", "#농구⛹🏻" ]} // 검색 태그 추가 후 MapService에서 마커 이미지 추가
//             handleSearchSubmit={handleSearchSubmit}
//             handleCheckboxChange={handleCheckboxChange} 
//           />
//            <div className="sports">
//           {["#축구⚽", "#배드민턴🏸", "#Gym🏋🏻‍♂️", "#배구🏐", "#테니스🎾", "#농구⛹🏻", "#런닝🏃🏻‍♂️"].map((sport, index) => (
//         <Button
//           key={index}
//           variant='outlined'
//           onClick={() => handleSearchSubmit(sport)}
//           className='sport'
//           color="primary"
//           style={{
//             margin: '5px 5px 5px 5px',
//             borderRadius: '50px',
//             padding: '5px 15px',
//             fontWeight: 'bold',
//             textTransform: 'none'
//           }}
//         >
//           {sport}
//         </Button>
//               ))} 
//           </div>
//         </div> */}

// {showOptions && (
//         <div className="options-container">
//           <SearchRadiusOptions
//             selectedRadius={selectedRadius}
//             handleRadiusButtonClick={handleRadiusButtonClick}
//             buttonClasses={`${classes.buttonCommon} ${classes.radiusButton}`}
//           />
//           <SearchOptions
//             options={["#축구⚽", "#배드민턴🏸", "#Gym🏋🏻‍♂️", "#배구🏐", "#테니스🎾", "#농구⛹🏻"]}
//             handleSearchSubmit={handleSearchSubmit}
//             handleCheckboxChange={handleCheckboxChange}
//             buttonClasses={`${classes.buttonCommon} ${classes.tagButton}`}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default SearchForm;