import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchForm from './SearchForm';
import PlaceList from './PlaceList';
import MapService from '../services/MapService';
import '../CSS/Map.css';
import Pagination from '@material-ui/lab/Pagination';

const KakaoMap = () => {
  const mapRef = useRef(null);
  const [keywords, setKeywords] = useState(["농구"]); // 검색어 상태 관리 
  const [userPosition, setUserPosition] = useState(null); // 사용자 위치 상태 관리
  const [places, setPlaces] = useState([]); // 장소 목록 상태 관리
  const [mapService, setMapService] = useState(null); // MapService 인스턴스 상태 관리
  const [showPlaceList, setShowPlaceList] = useState(false); // 장소 목록 표시 여부 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const [currentSet, setCurrentSet] = useState(1);
  const resultsPerPage = 4; // 페이지당 결과 수
  const pagesPerSet = 5; // 페이지네이션

  // 현재 위치 가져오기 함수
  const getCurrentPosition = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('브라우저 내에서 GPS 받아오기에 실패하였습니다.'));
      }
    });
  }, []);

  // 컴포넌트가 마운트될 때 사용자 위치 초기화
  useEffect(() => {
    const initializeUserPosition = async () => {
      try {
        const position = await getCurrentPosition();
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      } catch (error) {
        console.error(error);
        alert('사용자 위치를 가져올 수 없습니다.');
      }
    };
    initializeUserPosition();
  }, [getCurrentPosition]);

  // 사용자 위치가 변경될 때마다 지도 초기화
  useEffect(() => {
    if (mapRef.current && userPosition) {
      const mapServiceInstance = new MapService(mapRef.current, userPosition, setPlaces);
      mapServiceInstance.initMap();
      setMapService(mapServiceInstance);
    }
  }, [userPosition]);

  // 검색어 변경 시 장소 검색
  useEffect(() => {
    if (mapService && keywords.length > 0) {
      mapService.searchPlaces(keywords, []); // 초기에는 선택된 옵션이 없음
      setCurrentPage(1); // 페이지 초기화
      setCurrentSet(1);
      setShowPlaceList(true); // 장소 목록 표시
    } else {
      setShowPlaceList(false); // 장소 목록 숨기기
    }
  }, [mapService, keywords]);

  // 검색어 제출 처리 함수 ( 배열로 받은 키워드를 복수로 받을 수 있게 수정)
  const handleSearchSubmit = useCallback((searchKeywords, selectedOptions) => {
    setKeywords(searchKeywords.split(", ")); // 검색어 배열로 설정
    mapService.searchPlaces(searchKeywords.split(", "), selectedOptions); // 장소 검색 요청
  }, [mapService]);

  // 페이지 변경 처리 함수
  const changePage = useCallback((pageNumber) => {
    setCurrentPage(pageNumber); // 현재 페이지 설정
  }, []);

  // 검색 반경 변경 처리 함수
  const handleRadiusChange = useCallback((radius) => {
    if (mapService) {
      mapService.setRadius(radius); // 검색 반경 설정
      mapService.searchPlaces(keywords, []); // 장소 검색 요청 (선택된 옵션 초기화)
    }
  }, [mapService, keywords]);

  // 검색 결과 창 닫기
  const searchClose = useCallback(() => {
    setKeywords([]); // 검색어 초기화
    setPlaces([]); // 장소 목록 초기화
    setShowPlaceList(false); // 장소 목록 숨기기
    setCurrentPage(1); // 페이지 초기화
    setCurrentSet(1);
  }, []);

  // 장소 클릭 시 지도 중심 이동 처리 함수
  const handlePlaceClick = (place) => {
    if (mapService) {
      mapService.setCenter(place); // 클릭된 장소를 지도의 중심으로 설정
    }
  };


  //페이지 이전, 다음
  const totalPageCount = Math.ceil(places.length / resultsPerPage);
  const startPage = (currentSet - 1) * pagesPerSet + 1;
  const endPage = Math.min(currentSet * pagesPerSet, totalPageCount);

  return (
    <div className="map_wrap">
      {/* 지도 컨테이너 */}
      <div id="map" ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      {/* 검색 폼과 장소 목록 */}
      <div id="menu_wrap">
        <SearchForm 
          handleSearchSubmit={handleSearchSubmit} 
          handleRadiusChange={handleRadiusChange} 
        />
        <hr />
        {/* 장소 목록 표시 */}
        {showPlaceList && (
          <>
            <PlaceList
              places={places.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)}
              onPlaceClick={handlePlaceClick} // 장소 클릭 핸들러 전달
            />
            {/* 페이지네이션 */}
    {/* 페이지네이션 */}
    <div className="pagination-container">
      <div className="pagination">
        {startPage > 1 && (
          <button onClick={() => setCurrentSet(currentSet - 1)}>이전</button>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => changePage(startPage + index)}
            className={currentPage === startPage + index ? 'active' : ''}
          >
            {startPage + index}
          </button>
        ))}
        {endPage < totalPageCount && (
          <button onClick={() => setCurrentSet(currentSet + 1)}>다음</button>
        )}
        <button onClick={searchClose} className="pagination">접기</button>
        {/* 검색결과 창 닫기 */}
             </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KakaoMap;
