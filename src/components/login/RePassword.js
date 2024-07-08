import React, { useState } from 'react';
import { auth, db } from "../../firebase";

const RePassword = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleResetPassword = async () => {
    try {
      // Firestore에서 사용자를 찾기 위해 쿼리 실행
      const querySnapshot = await db.collection('users')
        .where('displayName', '==', displayName)
        .where('email', '==', email)
        .get();

      if (!querySnapshot.empty) {
        // 일치하는 사용자가 있는 경우
        await auth.sendPasswordResetEmail(email);
        setResult('비밀번호 재설정 이메일이 전송되었습니다.');
        setError(null);
      } else {
        // 일치하는 사용자가 없는 경우
        setResult(null);
        setError('해당 조건에 맞는 사용자를 찾을 수 없습니다!');
      }
    } catch (err) {
      console.error("비밀번호 재설정 이메일 전송 중 오류 발생:", err);
      setError('비밀번호 재설정 이메일 전송 중 오류 발생.');
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
      <button onClick={handleResetPassword}>비밀번호 재설정 이메일 보내기</button>
      {result && <p>{result}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default RePassword;
