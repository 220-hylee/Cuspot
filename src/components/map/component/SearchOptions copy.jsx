// import React, { useState } from 'react';
// import { Button, Checkbox } from "@material-ui/core";
// import '../CSS/Map.css';

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


  
// // 리턴 정상적인거
//   return (
//     <div className="tag-options" style={{ color: '#333', margin: '0' }}>
//       {options.map((option, index) => (
//        <Checkbox
//        key={index}
//        variant={selectedOption === option ? 'contained' : 'text'}
//        color="primary"
//        onClick={() => handleOptionButtonClick(option)}
//        style={{ 
//         borderRadius: "20px",
//         backgroundColor: selectedOption === option ? '#3f51b5' : '#f0f0f0', 
//         color: selectedOption === option ? '#fff' : '#333', 
//         margin: '5px',
//         // padding: '8px 16px',
//         transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
//         boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//       }}
//      >
//        {option}
//      </Checkbox>
//       ))}
//     </div>
//   );
// };

// export const SearchRadiusOptions = ({ selectedRadius, handleRadiusButtonClick }) => {
//   return (
//     <div className="options-container" style={{ margin: '0' }}>
//       <div className="button-options" style={{ margin: '0' }}>
//       <Button
//           variant={selectedRadius === "" ? 'contained' : 'text'}
//           color="primary"
//           onClick={() => handleRadiusButtonClick("")}
//           style={{ 
//             borderRadius: "20px",
//             backgroundColor: selectedRadius === "" ? '#358770' : '#f0f0f0', 
//             color: selectedRadius === "" ? '#fff' : '#333', 
//             margin: '5px',
//             // padding: '8px 16px',
//             transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           전체
//         </Button>
//         {["500", "1000", "1500", "2000"].map((radius, index) => (
//         <Button
//         key={index}
//         variant={selectedRadius === radius ? 'contained' : 'text'}
//         color="primary"
//         onClick={() => handleRadiusButtonClick(radius)}
//         className={selectedRadius === radius ? 'active' : ''}
//         style={{ 
//           borderRadius: '20px', 
//           backgroundColor: selectedRadius === radius ? '#358770' : '#f0f0f0', 
//           color: selectedRadius === radius ? '#fff' : '#333', 
//           margin: '5px',
//           // padding: '8px 16px',
//           transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
//           boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         {radius}m
//       </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchOptions;

// // 백업 포인트
import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import '../CSS/Map.css';
import { cuspotBlue } from '../../../assets/Colors';

// SearchOptions 컴포넌트를 정의하고, options, handleSearchSubmit, handleCheckboxChange, cuspotBlue를 props로 받습니다.
export const SearchOptions = ({ options, handleSearchSubmit, handleCheckboxChange, cuspotBlue }) => {
  // selectedOptions와 inputValue라는 두 개의 상태를 정의합니다.
  const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 모든 옵션을 보유하는 배열(그래야 선택해제도 가능해짐)
  const [inputValue, setInputValue] = useState('');

  // 옵션 버튼 클릭 시 호출되는 함수입니다.: 매개변수 option
  const handleOptionButtonClick = (option) => {  
    
    // 옵션이 이미 선택된 경우
    if (selectedOptions.includes(option)) {// selectedOptions 배열에서 클릭된 옵션을 제거한 새로운 배열을 만듭니다.
      const newSelectedOptions = selectedOptions.filter(item => item !== option);//filter는 selectedOptions 각 요소(item)를 반복- item과 option이 같지 않으면 새 배열에 item을 포함시킴
                                                                                // 클릭한 옵션을 제외한 새로운 배열이 탄생하는 것
      setSelectedOptions(newSelectedOptions); // 새로운 selectedOptions 배열을 문자열로 결합하여 검색을 수행합니다.
      handleSearchSubmit(newSelectedOptions.join(', ')); // 새로운 selectedOptions 배열을 문자열로 결합하여 inputValue 상태를 업데이트합니다.
      setInputValue(newSelectedOptions.join(', '));
    
    
      // 옵션이 선택되지 않은 경우
    } else {
      // selectedOptions 배열에 클릭된 옵션을 추가한 새로운 배열을 만듭니다.
      const newSelectedOptions = [...selectedOptions, option];// 이전에 만들어진selectedOptions을 가져와 펼친후, option을 추가
      setSelectedOptions(newSelectedOptions);// 새로운 selectedOptions 배열을 문자열로 결합하여 검색을 수행합니다.
      handleSearchSubmit(newSelectedOptions.join(', '));// 새로운 selectedOptions 배열을 문자열로 결합하여 inputValue 상태를 업데이트합니다.
      setInputValue(newSelectedOptions.join(', '));
    }
    // 체크박스의 상태를 업데이트하여 옵션 선택을 표시합니다.
    handleCheckboxChange(option);
  };

  // 컴포넌트의 JSX를 반환합니다.
  return (
    <div className="tag-options" style={{ margin: '0' }}>
      {options.map((option, index) => ( 
        <Button
          key={index}       // 각 버튼에 고유한 key를 부여하기 위해 index를 사용합니다.
          variant={selectedOptions.includes(option) ? 'contained' : ' '}
          color="primary"
          onClick={() => handleOptionButtonClick(option)} 
          style={{ 
            backgroundColor: '#F0F0F0', 
            color: cuspotBlue, 
            margin: '5px 5px 5px 5px', 
            borderRadius: '50px', 
            padding: '5px 15px',  
            fontWeight: 'bold',   
            textTransform: 'none' 
          }}
        >
          {option}
        </Button>
      ))}
      {/* Input field to show selected option */}
      {/* <input 
        type="text" 
        value={inputValue} 
        readOnly
        style={{ 
          display: 'block', 
          marginTop: '10px', 
          padding: '5px', 
          border: '1px solid #ccc' 
        }}
      /> */}
    </div>
  );
}; 

//반경 
export const SearchRadiusOptions = ({ selectedRadius, handleRadiusButtonClick }) => {
  const [inputValue, setInputValue] = useState(''); // 구성 요소 내부에는 상태 변수 inputValue가 선언되고 빈 문자열로 초기화
  // /useState('')는 상태를 초기화하고 이를 업데이트하기 위한 설정 함수 setInputValue를 제공

  //사용자가 클릭하는 반경값을 나타내는 radius 매개변수를 사용
  const handleRadiusClick = (radius) => {
    handleRadiusButtonClick(radius); // 반경 값 전달
    setInputValue(radius); // 검색 입력 창 값 업데이트
  };

  return (
    <div className="options-container" style={{ margin: '0' }}>
      <div className="button-options" style={{ margin: '0' }}>


        {/*  */}
        <Button
          variant={selectedRadius === "" ? 'contained' : 'primary'}
          color="primary"
          onClick={() => handleRadiusButtonClick("")}
          style={{ 
            // backgroundColor: 'transparent', 
            // border: '1px solid #ccc', 
            // color: '#333', 
            // margin: '5px 5px 5px 0' // 
            // border: '1px solid lightgray', // Ensure border is defined for the outlined variant
            margin: '5px 5px 5px 5px', // Adjust margin to reduce spacing
            borderRadius: '50px', // Rounded shape
            padding: '5px 15px',  // Padding for better appearance
            fontWeight: 'bold',   // Bold text for emphasis
            textTransform: 'none' // Keep the text as is without transformation
          }}
        >
          전체
        </Button>
        
        
        {/* 거리 버튼 - 둥근 아이콘모양 으로 수정 완 */}
        {["500", "1000", "1500", "2000"].map((radius, index) => (  
          <Button
          key={index}
          variant={selectedRadius === radius ? 'contained' : 'primary'}
          onClick={() => handleRadiusClick(radius)}
          className='length'
          color="primary"
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

        {/* 태그버튼을 누르면 input태그에 작성됨 */}
        {/* Input field to show selected radius */}
        {/* <input 
          type="text" 
          value={inputValue} 
          readOnly
          style={{ 
            display: 'block', 
            marginTop: '10px', 
            padding: '5px', 
            border: '1px solid #ccc' 
          }}
        /> */}
      </div>
    </div>
  //위에 반경 클릭하는 부분임.
  );
}

export default SearchOptions;