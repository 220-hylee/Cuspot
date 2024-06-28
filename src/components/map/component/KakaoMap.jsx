import React, { useState, useEffect, useRef } from 'react';
import SearchForm from './SearchForm';
import PlaceList from './PlaceList';
import MapService from '../services/MapService';
import '../CSS/Map.css';

const KakaoMap = () => {
  const mapRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [userPosition, setUserPosition] = useState(null);
  const [places, setPlaces] = useState([]);
  const [mapService, setMapService] = useState(null);
  const [showPlaceList, setShowPlaceList] = useState(false); // 결과창을 보이게 할지 여부
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8; // 페이지 당 결과 수

  useEffect(() => {
    const initializeUserPosition = async () => {
      try {
        const position = await getCurrentPosition();
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserPosition(newPosition);
      } catch (error) {
        console.error(error);
        alert('사용자 위치를 가져올 수 없습니다.');
      }
    };

    initializeUserPosition();
  }, []);

  useEffect(() => {
    if (mapRef.current && userPosition) {
      const mapServiceInstance = new MapService(mapRef.current, userPosition, setPlaces);
      mapServiceInstance.initMap();
      setMapService(mapServiceInstance);
    }
  }, [userPosition]);

  useEffect(() => {
    if (mapService && keyword) {
      mapService.searchPlaces(keyword);
      setCurrentPage(1); // 검색 시 첫 번째 페이지로 초기화
      setShowPlaceList(true); // 검색어가 있을 때만 결과창 보이기
    } else {
      setShowPlaceList(false); // 검색어가 없으면 결과창 숨기기
    }
  }, [keyword, mapService]);

  const handleSetUserPosition = async () => {
    try {
      const position = await getCurrentPosition();
      const newPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setUserPosition(newPosition);
      if (mapService) {
        mapService.updateUserPosition(newPosition);
      }
      setKeyword(""); // 사용자 위치 초기화 후 키워드 초기화
      setShowPlaceList(false); // 결과창 숨기기
    } catch (error) {
      console.error(error);
      alert('사용자 위치를 가져올 수 없습니다.');
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('브라우저 내에서 GPS 받아오기에 실패하였습니다.'));
      }
    });
  };

  const handleSearchSubmit = (searchKeyword) => {
    setKeyword(searchKeyword);
    setShowPlaceList(true); // 검색어가 있을 때 결과창 보이기
  };

  const handleOptionButtonClick = (keyword) => {
    handleSearchSubmit(keyword);
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 여기서 필요에 따라 검색 결과를 다시 가져오거나, 이미 가져온 결과를 페이지에 맞게 자를 수 있습니다.
  };

  return (
    <div className="map_wrap">
      <div className='map-controls1'>
        <button className="keyword-button1" onClick={() => handleOptionButtonClick("배드민턴")}>배드민턴</button>
      </div>

      <div className='map-controls2'>
        <button className="keyword-button2" onClick={() => handleOptionButtonClick("축구")}>축구</button>
      </div>

      <div className='map-controls3'>
        <button className="keyword-button3" onClick={() => handleOptionButtonClick("야구")}>야구</button>
      </div>

      <div className='map-controls4'>
        <button className="keyword-button4" onClick={() => handleOptionButtonClick("풋볼")}>풋볼</button>
      </div>

      <div id="map" ref={mapRef} style={{ width: '100%', height: '1000px', position: 'relative', overflow: 'hidden' }}></div>
      <div id="menu_wrap" className="bg_white">
        <SearchForm handleSearchSubmit={handleSearchSubmit} />
        <hr />
        {showPlaceList && (
          <>
            <PlaceList
              places={places.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)}
              currentPage={currentPage}
              resultsPerPage={resultsPerPage}
              changePage={changePage}
            />
            {/* 페이지네이션 UI */}
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

export default KakaoMap;
