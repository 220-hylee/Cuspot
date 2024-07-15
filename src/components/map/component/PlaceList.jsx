import React from 'react';

// PlaceList 컴포넌트: 검색 결과 장소 목록을 렌더링
const PlaceList = ({ places, onPlaceClick }) => {
  return (
    <ul id="placesList" className="place-list">
      {places.map((place, index) => (
        // 각 장소 항목 클릭 시 onPlaceClick 함수 호출
        <li 
          key={index} 
          className="item" 
          onClick={() => onPlaceClick(place)}>
          <span className={`markerbg marker_${index + 1}`}></span>
          <div className="info">
            <h2>{place.place_name}</h2>
            {place.road_address_name ? (
              <>
                <h3>{place.road_address_name}</h3>
                <h3 className="jibun gray">{place.address_name}</h3>
              </>
            ) : (
              <span>{place.address_name}</span>
            )}
            <span className="tel">{place.phone}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlaceList;


