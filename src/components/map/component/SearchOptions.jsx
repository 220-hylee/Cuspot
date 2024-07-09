import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import '../CSS/Map.css';
import { cuspotBlue } from '../../../assets/Colors';

export const SearchOptions = ({ options, handleSearchSubmit, handleCheckboxChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState('');
  
  const handleOptionButtonClick = (option) => {
    if (selectedOption === option) {
      setSelectedOption("");
      handleSearchSubmit(""); // 다시 선택시 빈 문자열로 검색
      setInputValue(""); // 입력 필드를 비움
    } else {
      setSelectedOption(option);
      handleSearchSubmit(option);
      setInputValue(option); // 입력 필드를 해당 옵션으로 설정
    }
    // handleCheckboxChange(option); // 옵션 선택시 위쪽에 표시
  };

  return (
    <div className="tag-options" style={{ margin: '0' }}>
      {options.map((option, index) => (
        <Button
          key={index}
          variant={selectedOption === option ? 'contained' : 'primary'}
          size="small"
          onClick={() => handleOptionButtonClick(option)}
          style={{ 
            backgroundColor: '#F0F0F0', 
            // border: '1px solid red', 
            color: cuspotBlue, 
            
            margin: '3px' // Adjust margin to reduce spacing
          }}
        >
          {option}
        </Button>
      ))}
      {/* Input field to show selected option */}
      <input 
        type="text" 
        value={inputValue} 
        readOnly
        style={{ 
          display: 'block', 
          marginTop: '10px', 
          padding: '5px', 
          border: '1px solid #ccc' 
        }}
      />
    </div>
  );
};

export const SearchRadiusOptions = ({ selectedRadius, handleRadiusButtonClick }) => {
  const [inputValue, setInputValue] = useState('');

  const handleRadiusClick = (radius) => {
    handleRadiusButtonClick(radius);
    setInputValue(radius);
  };

  return (
    <div className="options-container" style={{ margin: '0' }}>
      <div className="button-options" style={{ margin: '0' }}>
        {/* All 버튼 */}
        <Button 
          variant={selectedRadius === "" ? 'contained' : 'primary'}
          size="small"
          onClick={() => handleRadiusClick("")}
          className="length"
        >
          #ALL
        </Button>
        {/* 거리 버튼 */}
        {["#500", "#1000", "#1500", "#2000"].map((radius, index) => (
          
          <Button
            key={index}
            variant={selectedRadius === radius ? 'contained' : 'primary'}
            onClick={() => handleRadiusClick(radius)}
            className='length'
            style={{ 
              backgroundColor: selectedRadius === radius ? '#F0F0F0' : 'transparent', 
              color: selectedRadius === radius ? '#2453B3' : 'black', 
              // border: '1px solid lightgray', // Ensure border is defined for the outlined variant
              margin: '5px 5px 5px 5px', // Adjust margin to reduce spacing
              borderRadius: '50px', // Rounded shape
              padding: '5px 15px',  // Padding for better appearance
              fontWeight: 'bold',   // Bold text for emphasis
              textTransform: 'none' // Keep the text as is without transformation
            }}
          >
            {radius}
          </Button>
        )
        )}
        {/* Input field to show selected radius */}
        <input 
          type="text" 
          value={inputValue} 
          readOnly
          style={{ 
            display: 'block', 
            marginTop: '10px', 
            padding: '5px', 
            border: '1px solid #ccc' 
          }}
        />
      </div>
    </div>
  );
};

export default SearchOptions;


//===========================================================================================
// import React, { useState } from 'react';
// import { Button } from "@material-ui/core";
// import '../CSS/Map.css';
// import { cuspotBlue } from '../../../assets/Colors';

// export const SearchOptions = ({ options, handleSearchSubmit, handleCheckboxChange }) => {
//   const [selectedOption, setSelectedOption] = useState(""); 

//   const handleOptionButtonClick = (option) => {
//     if (selectedOption === option) {
//       setSelectedOption("");
//       handleSearchSubmit(""); // 다시 선택시 빈 문자열로 검색
//     } else {
//       setSelectedOption(option);
//       handleSearchSubmit(option);
//     }   
// // handleCheckboxChange(option); // 옵션 선택시 위쪽에 표시
//   };

//   // 종목별 태그 선택버튼
//   return (
//     // <div className="tag-options" style={{ color: '#333', margin: '0' }}>
//     <div className="tag-options" style={{ margin: '0' }}>
//       {options.map((option, index) => (
//         <Button
//           key={index}
//           variant={selectedOption === option ? 'contained' : 'primary'}
//           size="small"
//           onClick={() => handleOptionButtonClick(option)}
//           style={{ 
//             backgroundColor: '#F0F0F0', 
//             border: '1px solid #ccc', 
//             color: '#333', 
//             margin: '5px' // Adjust margin to reduce spacing

//           }}
//         >
//           {option}
//         </Button>
//       ))}
//     </div>
//   );
// };


// export const SearchRadiusOptions = ({ selectedRadius, handleRadiusButtonClick }) => {
//   return (
//     <div className="options-container" style={{ margin: '0' }}>
//       <div className="button-options" style={{ margin: '0' }}>

//         {/*All 버튼 */}
//         <Button 
//           variant={selectedRadius === "" ? 'contained' : 'primary'}
//           size="small"
//           onClick={() => handleRadiusButtonClick("")}
//           className="length"
//           >
//             #ALL
//           </Button>

//         {/* 거리 버튼 */}
//         {["#500", "#1000", "#1500", "#2000"].map((radius, index) => (
//         <Button
//           key={index}
//           variant={selectedRadius === radius ? 'contained' : 'outlined'}
//           color="primary"
//           onClick={() => handleRadiusButtonClick(radius)}
//           className='length'
//           style={{ 
//             backgroundColor: selectedRadius === radius ? '#F0F0F0' : 'transparent', 
//             color: selectedRadius === radius ? '#000' : '#2453B3', 
//             border: '1px solid lightgray', // Ensure border is defined for the outlined variant
//             margin: '5px 5px 5px 5px', // Adjust margin to reduce spacing,
//             borderRadius: '50px', // Rounded shape
//             padding: '5px 15px',  // Padding for better appearance
//             fontWeight: 'bold',   // Bold text for emphasis
//             textTransform: 'none' // Keep the text as is without transformation
//           }}
//         >
//           {radius}
//         </Button>
//       ))}

//       </div>
//     </div>
//   );
// };

// export default SearchOptions;

//=================================================================================================