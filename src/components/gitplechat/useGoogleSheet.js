import { useEffect, useState } from 'react';
import { getGoogleSheet } from './getGoogleSheet';
import { GoogleSpreadsheet } from 'google-spreadsheet';
// 구글 시트 데이터를 가져오는 커스텀 훅
const useGoogleSheet = (sheetTitle) => {
  const [googleSheetRows, setGoogleSheetRows] = useState([]);

  const fetchGoogleSheetRows = async () => {
    try {
      const googleSheet = await getGoogleSheet();
      const sheet = googleSheet.sheetsByTitle[sheetTitle];
      const rows = await sheet.getRows(); // 시트에서 모든 행 가져오기
      setGoogleSheetRows(rows);
    } catch (error) {
      console.error('구글 시트 행을 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchGoogleSheetRows();
  }, []);

  return googleSheetRows;
};


export default useGoogleSheet;
