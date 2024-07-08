import React, { useState } from 'react';
// import { functions } from "../../firebase"; // Firebase 초기화 파일에서 functions 가져오기
import { auth, db } from "../../firebase";

// const ResetPassword = () => {
//   const [displayName, setDisplayName] = useState('');
//   const [email, setEmail] = useState('');
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleResetPassword = async () => {
//     const sendTemporaryPassword = functions.httpsCallable('sendTemporaryPassword');

//     try {
//       const response = await sendTemporaryPassword({ displayName, email});
//       setResult(response.data.message);
//       setError(null);
//     } catch (err) {
//       console.error("임시 비밀번호 전송 중 오류 발생:", err);
//       setError(err.message);
//       setResult(null);
//     }
//   };

const RePassword = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
  
    const searchPwd = async () => {
      try {
        const querySnapshot = await db.collection('users')
          .where('displayName', '==', displayName)
          .where('email', '==', email)
          .get();
  
  
          // 봄동에서 데이터 검색
        if (!querySnapshot.empty) {
          const user = querySnapshot.docs[0].data(); // 첫 번째 일치하는 문서
  
          //성공
          setResult(user.password);
          setError(null);
        } else {
          // 검색은 성공이지만 해당하는 데이터 없음
          setResult(null);
          setError('해당 조건에 맞는 사용자를 찾을 수 없습니다!');
        }
  
        //검색자체가 실패
      } catch (err) {
        console.error("사용자 검색 중 오류 발생:", err);
        setError('사용자 검색 중 오류 발생.');
        setResult(null);
      }
    };
  return (
    <div>
      <h1>비밀번호 재설정</h1>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="이름 입력"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 입력"
      />
      {/* <button onClick={handleResetPassword}>임시 비밀번호 이메일 보내기</button> */}
      <button onClick={searchPwd}>비밀번호 찾기</button>
      {result && <p>{result}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default RePassword;
