import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import '../CSS/Map.css';

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

  return (
    <div className="tag-options" style={{ color: '#333', margin: '0' }}>
      {options.map((option, index) => (
       <Button
       key={index}
       variant={selectedOption === option ? 'contained' : 'text'}
       color="primary"
       onClick={() => handleOptionButtonClick(option)}
       style={{ 
        borderRadius: "20px",
        backgroundColor: selectedOption === option ? '#3f51b5' : '#f0f0f0', 
        color: selectedOption === option ? '#fff' : '#333', 
        margin: '5px',
        // padding: '8px 16px',
        transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
     >
       {option}
     </Button>
      ))}
    </div>
  );
};

export const SearchRadiusOptions = ({ selectedRadius, handleRadiusButtonClick }) => {
  return (
    <div className="options-container" style={{ margin: '0' }}>
      <div className="button-options" style={{ margin: '0' }}>
      <Button
          variant={selectedRadius === "" ? 'contained' : 'text'}
          color="primary"
          onClick={() => handleRadiusButtonClick("")}
          style={{ 
            borderRadius: "20px",
            backgroundColor: selectedRadius === "" ? '#358770' : '#f0f0f0', 
            color: selectedRadius === "" ? '#fff' : '#333', 
            margin: '5px',
            // padding: '8px 16px',
            transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          전체
        </Button>
        {["500", "1000", "1500", "2000"].map((radius, index) => (
        <Button
        key={index}
        variant={selectedRadius === radius ? 'contained' : 'text'}
        color="primary"
        onClick={() => handleRadiusButtonClick(radius)}
        className={selectedRadius === radius ? 'active' : ''}
        style={{ 
          borderRadius: '20px', 
          backgroundColor: selectedRadius === radius ? '#358770' : '#f0f0f0', 
          color: selectedRadius === radius ? '#fff' : '#333', 
          margin: '5px',
          // padding: '8px 16px',
          transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
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

// // import React, { useState } from 'react';
// // import { Button } from "@material-ui/core";
// // import '../CSS/Map.css';
// // import { cuspotBlue } from '../../../assets/Colors';

// // export const SearchOptions = ({ options, handleSearchSubmit, handleCheckboxChange, buttonClasses }) => {
// //   const [selectedOption, setSelectedOption] = useState("");
// //   const [inputValue, setInputValue] = useState('');
  
// //   const handleOptionButtonClick = (option) => {
// //     if (selectedOption === option) {
// //       setSelectedOption("");
// //       handleSearchSubmit(""); // 다시 선택시 빈 문자열로 검색
// //       setInputValue(""); // 입력 필드를 비움
// //     } else {
// //       setSelectedOption(option);
// //       handleSearchSubmit(option);
// //       setInputValue(option); // 입력 필드를 해당 옵션으로 설정
// //     }
// //     // handleCheckboxChange(option); // 옵션 선택시 위쪽에 표시
// //   };

// //   return (
// //     <div className="tag-options" style={{ margin: '0' }}>
// //       {options.map((option, index) => (
// //         <Button
// //           key={index}
// //           variant={selectedOption === option ? 'contained' : 'outlined'}
// //           className={buttonClasses}
// //           onClick={() => handleOptionButtonClick(option)}
// //         >
// //           {option}
// //         </Button>
// //       ))}
// //       <input 
// //         type="text" 
// //         value={inputValue} 
// //         readOnly
// //         style={{ 
// //           display: 'block', 
// //           marginTop: '10px', 
// //           padding: '5px', 
// //           border: '1px solid #ccc' 
// //         }}
// //       />
// //     </div>
// //   );
// // };

// // export const SearchRadiusOptions = ({ selectedRadius, handleRadiusButtonClick, buttonClasses }) => {
// //   const [inputValue, setInputValue] = useState('');

// //   const handleRadiusClick = (radius) => {
// //     handleRadiusButtonClick(radius);
// //     setInputValue(radius);
// //   };

// //   return (
// //     <div className="options-container" style={{ margin: '0' }}>
// //       <div className="button-options" style={{ margin: '0' }}>

// //         <Button
// //           variant={selectedRadius === "" ? 'contained' : 'primary'}
// //           color="primary"
// //           onClick={() => handleRadiusButtonClick("")}
// //           style={{ 
// //             // backgroundColor: 'transparent', 
// //             // border: '1px solid #ccc', 
// //             // color: '#333', 
// //             // margin: '5px 5px 5px 0' // 
// //             // border: '1px solid lightgray', // Ensure border is defined for the outlined variant
// //             margin: '5px 5px 5px 5px', // Adjust margin to reduce spacing
// //             borderRadius: '50px', // Rounded shape
// //             padding: '5px 15px',  // Padding for better appearance
// //             fontWeight: 'bold',   // Bold text for emphasis
// //             textTransform: 'none' // Keep the text as is without transformation
// //           }}
// //         >
// //           전체
// //         </Button>
        
        
// //         {/* 거리 버튼 - 둥근 아이콘모양 으로 수정 완 */}
// //         {["#500", "#1000", "#1500", "#2000"].map((radius, index) => (  
// //           <Button
// //           key={index}
// //           variant={selectedRadius === radius ? 'contained' : 'primary'}
// //           className={buttonClasses}
// //           onClick={() => handleRadiusClick(radius)}
// //         >
// //           {radius}
// //         </Button>
// //       ))}
// //       <input 
// //         type="text" 
// //         value={inputValue} 
// //         readOnly
// //         style={{ 
// //           display: 'block', 
// //           marginTop: '10px', 
// //           radius: '10'
// //           padding: '5px', 
// //           border: '1px solid #ccc' 
// //         }}
// //       />
// //     </div>
// //   </div>
// //   //위에 반경 클릭하는 부분임.
// //   );
// // }

// // export default SearchOptions;



// import React, { useState } from 'react';
// import { Button } from "@material-ui/core";
// import '../CSS/Map.css';
// import { cuspotBlue } from '../../../assets/Colors';

// export const SearchOptions = ({ options, handleSearchSubmit, handleCheckboxChange }) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [inputValue, setInputValue] = useState('');
  
//   const handleOptionButtonClick = (option) => {
//     if (selectedOption === option) {
//       setSelectedOption("");
//       handleSearchSubmit(""); // 다시 선택시 빈 문자열로 검색
//       setInputValue(""); // 입력 필드를 비움
//     } else {
//       setSelectedOption(option);
//       handleSearchSubmit(option);
//       setInputValue(option); // 입력 필드를 해당 옵션으로 설정
//     }
//     // handleCheckboxChange(option); // 옵션 선택시 위쪽에 표시
//   };

//   return (
//     <div className="tag-options" style={{ margin: '0' }}>
//       {options.map((option, index) => (
//         <Button
//           key={index}
//           variant={selectedOption === option ? 'contained' : 'outlined'}
//           color="primary"
//           onClick={() => handleOptionButtonClick(option)}
//           style={{ 
//             backgroundColor: '#F0F0F0', 
//             // border: '1px solid red', 
//             color: cuspotBlue, 
            
//             margin: '3px' // Adjust margin to reduce spacing
//           }}
//         >
//           {option}
//         </Button>
//       ))}
//       {/* Input field to show selected option */}
//       <input 
//         type="text" 
//         value={inputValue} 
//         readOnly
//         style={{ 
//           display: 'block', 
//           marginTop: '10px', 
//           padding: '5px', 
//           border: '1px solid #ccc' 
//         }}
//       />
//     </div>
//   );
// };

// export const SearchRadiusOptions = ({ selectedRadius, handleRadiusButtonClick }) => {
//   const [inputValue, setInputValue] = useState('');

//   const handleRadiusClick = (radius) => {
//     handleRadiusButtonClick(radius);
//     setInputValue(radius);
//   };

//   return (
//     <div className="options-container" style={{ margin: '0' }}>
//       <div className="button-options" style={{ margin: '0' }}>


//         {/*  */}
//         <Button
//           variant={selectedRadius === "" ? 'contained' : 'primary'}
//           color="primary"
//           onClick={() => handleRadiusButtonClick("")}
//           style={{ 
//             // backgroundColor: 'transparent', 
//             // border: '1px solid #ccc', 
//             // color: '#333', 
//             // margin: '5px 5px 5px 0' // 
//             // border: '1px solid lightgray', // Ensure border is defined for the outlined variant
//             margin: '5px 5px 5px 5px', // Adjust margin to reduce spacing
//             borderRadius: '50px', // Rounded shape
//             padding: '5px 15px',  // Padding for better appearance
//             fontWeight: 'bold',   // Bold text for emphasis
//             textTransform: 'none' // Keep the text as is without transformation
//           }}
//         >
//           전체
//         </Button>
        
        
//         {/* 거리 버튼 - 둥근 아이콘모양 으로 수정 완 */}
//         {["#500", "#1000", "#1500", "#2000"].map((radius, index) => (  
//           <Button
//           key={index}
//           variant={selectedRadius === radius ? 'contained' : 'primary'}
//           onClick={() => handleRadiusClick(radius)}
//           className='length'
//           color="primary"
//           style={{ 
//             backgroundColor: selectedRadius === radius ? '#F0F0F0' : 'transparent', 
//             color: selectedRadius === radius ? '#2453B3' : 'black', 
//             // border: '1px solid lightgray', // Ensure border is defined for the outlined variant
//             margin: '5px 5px 5px 5px', // Adjust margin to reduce spacing
//             borderRadius: '50px', // Rounded shape
//             padding: '5px 15px',  // Padding for better appearance
//             fontWeight: 'bold',   // Bold text for emphasis
//             textTransform: 'none' // Keep the text as is without transformation
//           }}
//         >
//             {radius}
//           </Button>
//         )
//         )}

//         {/* 태그버튼을 누르면 input태그에 작성됨 */}
//         {/* Input field to show selected radius */}
//         <input 
//           type="text" 
//           value={inputValue} 
//           readOnly
//           style={{ 
//             display: 'block', 
//             marginTop: '10px', 
//             padding: '5px', 
//             border: '1px solid #ccc' 
//           }}
//         />
//       </div>
//     </div>
//   //위에 반경 클릭하는 부분임.
//   );
// }

// export default SearchOptions;
