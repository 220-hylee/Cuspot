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
    this.radiusOptions = [500, 1000, 1500, 2000]; // 검색 반경 옵션 배열
    this.currentRadius = 1000;         // 현재 선택된 검색 반경
  }

  // 지도 초기화 메서드
  initMap() {
    if (!this.kakao || !this.kakao.maps) { // Kakao 지도 API 로드 여부 확인
      console.error('Kakao 지도 API가 로드되지 않았습니다.');
      return;
    }

    // 지도 옵션 설정
    const mapOption = {
      center: this.userPosition 
        ? new this.kakao.maps.LatLng(this.userPosition.lat, this.userPosition.lng) 
        : new this.kakao.maps.LatLng(37.566826, 126.9786567), // 기본 위치 설정 (서울)
      level: 3 // 지도 확대 레벨
    };

    // Kakao 지도 객체 생성
    this.map = new this.kakao.maps.Map(this.mapContainer, mapOption);

    // Kakao 장소 검색 서비스 객체 생성
    this.ps = new this.kakao.maps.services.Places();

    // Kakao 인포윈도우 객체 생성
    this.infowindow = new this.kakao.maps.InfoWindow({ zIndex: 1 });

    // 사용자 위치가 설정되어 있다면, 사용자 마커 추가
    if (this.userPosition) {
      this.addUserMarker(this.userPosition);
    }
  }

  // 사용자 위치 업데이트 메서드
  updateUserPosition(position) {
    this.userPosition = position; // 사용자 위치 업데이트

    if (this.map) {
      const newCenter = new this.kakao.maps.LatLng(position.lat, position.lng);
      this.map.setCenter(newCenter); // 지도 중심 위치 변경
      this.addUserMarker(position); // 사용자 마커 업데이트
    }
  }

  // 사용자 마커 추가 메서드
  addUserMarker(position) {
    if (this.userMarker) {
      this.userMarker.setMap(null); // 기존 사용자 마커 제거
    }

    // 새로운 사용자 마커 생성 및 지도에 추가
    const marker = new this.kakao.maps.Marker({
      position: new this.kakao.maps.LatLng(position.lat, position.lng),
      map: this.map
    });
    this.userMarker = marker; // 사용자 마커 객체 저장
  }

  // 검색 반경 설정 메서드
  setRadius(radius) {
    if (this.radiusOptions.includes(radius)) {
      this.currentRadius = radius; // 유효한 검색 반경 설정
    } else {
      console.warn('유효하지 않은 검색 반경입니다.');
    }
  }

  // 장소 검색 메서드
  searchPlaces(keyword) {
    if (!this.userPosition) {
      alert('사용자 위치를 먼저 설정해주세요.');
      return;
    }

    // 검색 옵션 설정
    const options = {
      location: new this.kakao.maps.LatLng(this.userPosition.lat, this.userPosition.lng),
      radius: parseInt(this.currentRadius) // 현재 설정된 검색 반경
    };

    // Kakao 장소 검색 API 호출
    this.ps.keywordSearch(keyword, this.placesSearchCB.bind(this), options);
  }

  // 장소 검색 결과 콜백 메서드
  placesSearchCB(data, status, pagination) {
    if (status === this.kakao.maps.services.Status.OK) {
      const sortedPlaces = this.sortPlacesByDistance(data); // 거리순으로 장소 정렬
      this.setPlaces(sortedPlaces); // 검색 결과 상태 업데이트
      this.displayPlaces(sortedPlaces); // 검색 결과 장소들 지도에 표시
      this.displayPagination(pagination); // 페이지네이션 UI 표시
    } else if (status === this.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      this.setPlaces([]); // 검색 결과 없음을 상태에 반영
    } else if (status === this.kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
      this.setPlaces([]); // 검색 오류 상태에 반영
    }
  }

  // 검색 결과 장소들을 지도에 표시하는 메서드
  displayPlaces(places) {
    const bounds = new this.kakao.maps.LatLngBounds(); // 지도 영역 객체 생성

    this.removeMarker(); // 기존 마커들 제거

    // 각 장소별로 마커 추가 및 이벤트 처리
    for (let i = 0; i < places.length; i++) {
      const position = new this.kakao.maps.LatLng(places[i].y, places[i].x);
      const marker = this.addMarker(position, i);

      // 마커 클릭 시 인포윈도우 표시
      this.kakao.maps.event.addListener(marker, 'click', () => {
        this.displayInfowindow(marker, places[i].place_name);
      });

      bounds.extend(position); // 마커 위치를 포함한 범위 확장
    }

    this.map.setBounds(bounds); // 모든 마커가 보이도록 지도 영역 설정
  }

  // 마커를 추가하고 반환하는 메서드
  addMarker(position, idx) {
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    const imageSize = new this.kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new this.kakao.maps.Size(36, 691),
      spriteOrigin: new this.kakao.maps.Point(0, (idx * 46) + 10),
      offset: new this.kakao.maps.Point(13, 37)
    };
    const markerImage = new this.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

    // 새로운 마커 생성 및 지도에 추가
    const marker = new this.kakao.maps.Marker({
      position,
      image: markerImage
    });

    marker.setMap(this.map); // 마커 지도에 표시
    this.markers.push(marker); // 마커 배열에 추가

    return marker; // 생성된 마커 객체 반환
  }

  // 모든 마커 제거 메서드
  removeMarker() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null); // 각 마커 지도에서 제거
    }
    this.markers.length = 0; // 마커 배열 비우기
  }

  // 페이지네이션 UI를 표시하는 메서드
  displayPagination(pagination) {
    const paginationEl = document.getElementById('pagination');

    if (!paginationEl) {
      console.warn('페이지네이션 요소를 찾을 수 없습니다.');
      return;
    }

    const fragment = document.createDocumentFragment();

    // 기존 페이지네이션 요소 제거
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    // 각 페이지 버튼 생성 및 이벤트 처리
    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.href = '#';
      el.textContent = i;

      if (i === pagination.current) {
        el.classList.add('active'); // 현재 페이지 표시
      }

      el.addEventListener('click', (e) => {
        e.preventDefault();
        pagination.gotoPage(i); // 페이지 클릭 시 해당 페이지로 이동
      });

      fragment.appendChild(el)
    }

    paginationEl.appendChild(fragment);
  }

  displayInfowindow(marker, placeName) {
    const content = `<div style="padding:10px;">${placeName}</div>`;
    this.infowindow.setContent(content);
    this.infowindow.open(this.map, marker);
  }

  // 거리순으로 장소 정렬하는 메서드
  sortPlacesByDistance(places) {
    // 사용자 위치와 각 장소의 거리를 계산하여 정렬
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
}

export default MapService;
