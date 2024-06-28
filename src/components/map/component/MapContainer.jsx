import React, { useEffect } from 'react';
import '../Map.css';

const MapContainer = React.forwardRef(({ userPosition, keyword }, ref) => {
  useEffect(() => {
    if (!ref.current || !userPosition) return;

    const { kakao } = window;
    const mapContainer = ref.current;
    const mapOption = {
      center: new kakao.maps.LatLng(userPosition.lat, userPosition.lng),
      level: 3
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const markerPosition = new kakao.maps.LatLng(userPosition.lat, userPosition.lng);
    const markerImage = 'https://map.kakao.com/web/image/v4/map/kr/daumsearch_map/marker/marker_13.png';
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: new kakao.maps.MarkerImage(markerImage, new kakao.maps.Size(24, 35))
    });
    marker.setMap(map);

    // Clean-up function
    return () => {
      if (marker) marker.setMap(null); // 마커 제거
    };
  }, [userPosition]);

  return <div id="map" style={{ width: '100%', height: '500px' }} ref={ref}></div>;
});

export default MapContainer;
