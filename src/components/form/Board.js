import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';

const Board = () => {
    const [board,setBoard] = useState([]);

    useEffect(() => {
        const posts = firestore.collection("posts");
    
         // 데이터 가져오기
        posts.get().then((e) => {
            const posts = [];
            e.forEach((data) => {
                posts.push({id: data.email, ...data.data()});
            });
            setBoard(posts);
        }).catch((error) => {
            console.error("데이터 가져오기 실패!", error);
        }); 
        
    }, []);
    
   
    return (
        <>
            <h1>Firebase 연결</h1>
           {board.length > 0 ? (
             <div>
                {board.map(data => (
                    <li key={data.email}>
                        <p>이름 : {data.username}</p>
                        <p>이메일 : {data.email}</p>
                    </li>
                ))}
             </div>
           ) : (
                <p>찾는중..</p>
           )}
        </>
    );
}

export default Board;