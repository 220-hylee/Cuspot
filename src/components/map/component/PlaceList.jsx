import React from 'react';

const PlaceList = ({ places }) => {
  return (
    <ul id="placesList" className="place-list">
      {places.map((place, index) => (
        <li key={index} className="item">
          <span className={`markerbg marker_${index + 1}`}></span>
          <div className="info">
            <h5>{place.place_name}</h5>
            {place.road_address_name ? (
              <>
                <span>{place.road_address_name}</span>
                <span className="jibun gray">{place.address_name}</span>
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
