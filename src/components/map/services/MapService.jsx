// 마커 이미지
import sccoer from "../../../assets/images/sccoer.png"; // 축구
import badminton from "../../../assets/images/badminton.png"; // 배드민턴
import fitness from "../../../assets/images/fitness.png"; // 헬스
import baseball from "../../../assets/images/baseball.png"; // 야구
import tennis from "../../../assets/images/tennis.png"; // 테니스 


class MapService {
  constructor(mapContainer, userPosition, setPlaces) {
    this.mapContainer = mapContainer;  // 지도를 표시할 HTML 요소의 참조
    this.userPosition = userPosition;  // 사용자의 현재 위치 좌표
    this.setPlaces = setPlaces;        // 검색 결과 장소들을 설정할 상태 업데이트 함수
    this.kakao = window.kakao;         // Kakao 지도 API 객체
    this.markers = [];                 // 지도에 표시할 마커들을 관리할 배열
    this.userMarker = null;            // 사용자 위치를 나타내는 마커 객체
    this.map = null;                   // Kakao 지도 객체
    this.ps = null;                    // Kakao 장소 검색 서비스 객체
    this.infowindow = null;            // Kakao 인포윈도우 객체
    this.currentRadius = null;         // 현재 선택된 검색 반경
    this.keyword ="";
  }

  // 지도 초기화 메서드
  initMap() {
    if (!this.kakao || !this.kakao.maps) {
      console.error('Kakao 지도 API가 로드되지 않았습니다.');
      return;
    }

    const mapOption = {
      center: this.userPosition
        ? new this.kakao.maps.LatLng(this.userPosition.lat, this.userPosition.lng)
        : new this.kakao.maps.LatLng(37.566826, 126.9786567), // 기본 위치 설정 (서울)
      level: 3 // 지도 확대 레벨
    };

    this.map = new this.kakao.maps.Map(this.mapContainer, mapOption);
    this.ps = new this.kakao.maps.services.Places();
    this.infowindow = new this.kakao.maps.InfoWindow({ zIndex: 1 });

    if (this.userPosition) {
      this.addUserMarker(this.userPosition);
    }
  }

  // 사용자 위치 업데이트 메서드
  updateUserPosition(position) {
    this.userPosition = position;
    if (this.map) {
      const newCenter = new this.kakao.maps.LatLng(position.lat, position.lng);
      this.map.setCenter(newCenter);
      this.addUserMarker(position);
    }
  }

  // 사용자 마커 추가 메서드
  addUserMarker(position) {
    if (this.userMarker) {
      this.userMarker.setMap(null);
    }

    const marker = new this.kakao.maps.Marker({
      position: new this.kakao.maps.LatLng(position.lat, position.lng),
      map: this.map
    });
    this.userMarker = marker;
  }

  // 검색 반경 설정 메서드
  setRadius(radius) {
    if (radius > 0) {
      this.currentRadius = radius;
    }
    else {
      this.currentRadius =  null;
    }
  }

  // 장소 검색 메서드
  searchPlaces(keyword, selectedOptions) {
    this.keyword = keyword;
    if (!this.userPosition) {
      alert('사용자 위치를 먼저 설정해주세요.');
      return;
    }
  
    const options = {
      location: new this.kakao.maps.LatLng(this.userPosition.lat, this.userPosition.lng),
      radius: this.currentRadius
    };
  
    // 체크박스 옵션에 따라 필터 추가
    const additionalFilters = [];
    if (selectedOptions.checkbox1) {
      additionalFilters.push('option1');
    }
    if (selectedOptions.checkbox2) {
      additionalFilters.push('option2');
    }
  
    // Kakao 장소 검색 API 호출
    this.ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === this.kakao.maps.services.Status.OK) {
        const sortedPlaces = this.sortPlacesByDistance(data);
        this.setPlaces(sortedPlaces);
        this.displayPlaces(sortedPlaces);
        this.displayPagination(pagination);
      } else if (status === this.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        this.setPlaces([]);
      } else if (status === this.kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
        this.setPlaces([]);
      }
    }, {
      ...options,
      filters: additionalFilters
    });
  }

  // 거리순으로 장소 정렬하는 메서드
  sortPlacesByDistance(places) {
    const sortedPlaces = places.map(place => {
      const distance = this.calculateDistance(this.userPosition, { lat: place.y, lng: place.x });
      return { ...place, distance };
    }).sort((a, b) => a.distance - b.distance);

    return sortedPlaces;
  }

  // 두 지점 간의 단순 거리 계산 메서드
  calculateDistance(pos1, pos2) {
    const latDiff = Math.abs(pos1.lat - pos2.lat);
    const lngDiff = Math.abs(pos1.lng - pos2.lng);
    return Math.sqrt(latDiff ** 2 + lngDiff ** 2);
  }

  // 검색 결과 장소들을 지도에 표시하는 메서드
  displayPlaces(places) {
    const bounds = new this.kakao.maps.LatLngBounds();

    this.removeMarker();

    places.forEach((place, index) => {
      const position = new this.kakao.maps.LatLng(place.y, place.x);
      const marker = this.addMarker(position, index);

      this.kakao.maps.event.addListener(marker, 'click', () => {
        this.displayInfowindow(marker, place.place_name);
      });

      bounds.extend(position);
    });

    this.map.setBounds(bounds);
  }

  // 마커를 추가하고 반환하는 메서드
  addMarker(position, index) {
    let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    // 마커 사이즈 --------------------------------------
    let imageSize = new this.kakao.maps.Size(34, 35);
    let imgOptions = {offset: new this.kakao.maps.Point(27, 69)};
    // --------------------------------------------------
    
    // 검색이 축구 일 경우
    if(this.keyword.match("축구")){
      imageSrc = sccoer; 
    }  
    
    // 검색이 배드민턴 일 경우
    
    else if(this.keyword.match("배드민턴")){
      imageSrc = badminton;
    }
    
    // 검색이 배드민턴 일 경우
    else if(this.keyword.match("야구")){
      imageSrc = baseball;
    }
    
    else if(this.keyword.match("테니스")){
      imageSrc = tennis;
    }

    else if(this.keyword.match("헬스")){
      imageSrc = fitness;
    }
    else {
      
    }
    
    const markerImage = new this.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

    const marker = new this.kakao.maps.Marker({
      position,
      image: markerImage
    });

    marker.setMap(this.map);
    this.markers.push(marker);

    return marker;
  }

  // 모든 마커 제거 메서드
  removeMarker() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  // 페이지네이션 UI를 표시하는 메서드
  displayPagination(pagination) {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) {
      console.warn('페이지네이션 요소를 찾을 수 없습니다.');
      return;
    }

    paginationEl.innerHTML = '';

    for (let i = 1; i <= pagination.last; i++) {
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.addEventListener('click', (e) => {
        e.preventDefault();
        pagination.gotoPage(i);
      });

      if (i === pagination.current) {
        pageLink.classList.add('active');
      }

      paginationEl.appendChild(pageLink);
    }
  }

  // 인포윈도우 표시 메서드
  displayInfowindow(marker, placeName) {
    const content = `<div style="padding:10px;">${placeName}</div>`;
    this.infowindow.setContent(content);
    this.infowindow.open(this.map, marker);
  }
}

export default MapService;
