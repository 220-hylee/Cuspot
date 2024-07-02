import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchForm from './SearchForm';
import PlaceList from './PlaceList';
import MapService from '../services/MapService';
import '../CSS/Map.css';
const KakaoMap = () => {
  const mapRef = useRef(null);
  // 검색어 상태 관리
  const [keyword, setKeyword] = useState("");
  // 사용자 위치 상태 관리
  const [userPosition, setUserPosition] = useState(null);
  // 장소 목록 상태 관리
  const [places, setPlaces] = useState([]);
  // MapService 인스턴스 상태 관리
  const [mapService, setMapService] = useState(null);
  // 장소 목록 표시 여부 상태 관리
  const [showPlaceList, setShowPlaceList] = useState(false);
  // 현재 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지당 결과 수
  const resultsPerPage = 5;
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
    if (mapService && keyword) {
      mapService.searchPlaces(keyword, []); // 초기에는 선택된 옵션이 없음
      setCurrentPage(1); // 페이지 초기화
      setShowPlaceList(true); // 장소 목록 표시
    } else {
      setShowPlaceList(false); // 장소 목록 숨기기
    }
  }, [mapService, keyword]);
  // 검색어 제출 처리 함수
  const handleSearchSubmit = useCallback((searchKeyword, selectedOptions) => {
    setKeyword(searchKeyword); // 검색어 설정
    mapService.searchPlaces(searchKeyword, selectedOptions); // 장소 검색 요청
  }, [mapService]);
  // 페이지 변경 처리 함수
  const changePage = useCallback((pageNumber) => {
    setCurrentPage(pageNumber); // 현재 페이지 설정
  }, []);
  // 검색 반경 변경 처리 함수
  const handleRadiusChange = useCallback((radius) => {
    if (mapService) {
      mapService.setRadius(radius); // 검색 반경 설정
      mapService.searchPlaces(keyword, []); // 장소 검색 요청 (선택된 옵션 초기화)
    }
  }, [mapService, keyword]);
  return (
    <div className="map_wrap">
      {/* 지도 컨테이너 */}
      <div id="map" ref={mapRef} style={{ width: '100%', height: '100%', position: '', overflow: '' }}></div>
      {/* 검색 폼과 장소 목록 */}
      <div id="menu_wrap">
        <SearchForm handleSearchSubmit={handleSearchSubmit} handleRadiusChange={handleRadiusChange} />
        <hr />
        {/* 장소 목록 표시 */}
        {showPlaceList && (
          <>
            <PlaceList
              places={places.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)}
              currentPage={currentPage}
              resultsPerPage={resultsPerPage}
              changePage={changePage}
            />
            {/* 페이지네이션 */}
            <div className="pagination">
              {Array.from({ length: Math.ceil(places.length / resultsPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => changePage(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
<<<<<<< HEAD
=======

>>>>>>> eda1d5ce464cacd494c658ee8e6c007ecd7189f2
export default KakaoMap;