import React, { useState } from 'react';
import { auth, db } from "../../firebase";

const FindEmail = () => {
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const searchEmail = async () => {
    try {
      const querySnapshot = await db.collection('users')
        .where('displayName', '==', displayName)
        .where('phone', '==', phone)
        .get();


        // 봄동에서 데이터 검색
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data(); // 첫 번째 일치하는 문서

        //성공
        setResult(user.email);
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
      
      <h1>이름과 전화번호로 이메일 찾기</h1>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="이름 입력"
      />

      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="전화번호 입력"
      />
      <button onClick={searchEmail}>검색</button>
      {result && <p>이메일: {result}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FindEmail;
