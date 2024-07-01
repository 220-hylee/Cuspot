import React, { useEffect, useState } from 'react';
import { Paper } from "@material-ui/core";
import axios from 'axios';
import Header from "../header/Header";


function GptResult() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const sheetId = '1iCCfFgbT43iVt0f_0cwUALr3i2-oLU8jn9brUc_3HMA';
    const apiKey = 'AIzaSyBP5KnUzW6BJaOgfeOjWA8RJhAiawg7Br0';
    const range = 'Result Sheet!A:A'; // 가져오고자 하는 범위(A열의 전체 범위)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    axios.get(url)
      .then(response => {
        console.log(response.data.values); // 데이터를 콘솔에 출력하여 확인
        const rows = response.data.values;
        if(rows.length>0){
          setData([rows[rows.length-1]]);
          //setData(rows);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="GptResult">
      <div id="data">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          data.length > 0 ? (
            <table border="1">
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )
        )}
      </div>
    </div>
  );
}
export default GptResult;