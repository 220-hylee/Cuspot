//구글 apikey : AIzaSyCeFw0cVsKC4wHDLQBM1GlhhT7De_NV_Xk
//시트 아이디 : 1dzyPaFLArMzWOwawJgc1qN1WYzTfc4g9RTO08SwyxGo

import { GoogleSpreadsheet } from 'google-spreadsheet';

// 구글 시트 문서를 가져오는 함수
export const getGoogleSheet = async () => {
  const doc = new GoogleSpreadsheet('1dzyPaFLArMzWOwawJgc1qN1WYzTfc4g9RTO08SwyxGo');
  
  // API 키를 사용하여 인증
  await doc.useApiKey('AIzaSyCeFw0cVsKC4wHDLQBM1GlhhT7De_NV_Xk');
  
  await doc.loadInfo(); // 문서 속성과 시트 로드
  return doc;
};