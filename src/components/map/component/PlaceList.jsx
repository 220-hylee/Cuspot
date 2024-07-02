import React from 'react';

const PlaceList = ({ places }) => {
  return (
    <ul id="placesList" className="place-list">
      {places.map((place, index) => (
        <li key={index} className="item">
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
