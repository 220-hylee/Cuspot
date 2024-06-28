class MapService {
  constructor(mapContainer, userPosition, setPlaces) {
    this.mapContainer = mapContainer; // 지도를 표시할 HTML 요소의 참조
    this.userPosition = userPosition; // 사용자의 위치 정보 객체 { lat, lng }
    this.setPlaces = setPlaces; // 검색 결과를 상태로 설정하는 콜백 함수
    this.kakao = window.kakao; // Kakao 지도 API 객체
    this.markers = []; // 마커 객체들을 저장할 배열
    this.userMarker = null; // 사용자 위치를 표시할 마커 객체
    this.map = null; // Kakao 지도 객체
    this.ps = null; // Kakao Places 서비스 객체
    this.infowindow = null; // 인포윈도우 객체
    this.radiusOptions = [500, 1000, 1500, 2000]; // 검색 반경 옵션 설정
    this.currentRadius = 1000; // 기본 검색 반경 설정 (1km)
  }

  // 지도 초기화 메서드
  initMap() {
    if (!this.kakao || !this.kakao.maps) {
      console.error('Kakao 지도 API가 로드되지 않았습니다.');
      return;
    }

    // 지도 옵션 설정
    const mapOption = {
      center: this.userPosition 
        ? new this.kakao.maps.LatLng(this.userPosition.lat, this.userPosition.lng) 
        : new this.kakao.maps.LatLng(37.566826, 126.9786567), // 사용자 위치가 없을 경우 기본 위치
      level: 3 // 지도 레벨 설정
    };

    // Kakao 지도 객체 생성
    this.map = new this.kakao.maps.Map(this.mapContainer, mapOption);

    // Kakao Places 서비스 객체 생성
    this.ps = new this.kakao.maps.services.Places();

    // 인포윈도우 객체 생성
    this.infowindow = new this.kakao.maps.InfoWindow({ zIndex: 1 });

    // 사용자 위치가 있을 경우 사용자 위치 마커 추가
    if (this.userPosition) {
      this.addUserMarker(this.userPosition);
    }
  }

  // 사용자 위치 업데이트 메서드
  updateUserPosition(position) {
    // 사용자 위치 업데이트
    this.userPosition = position;

    // 지도가 초기화된 사용자 설정을 받아 지도의 중심으로 설정 
    if (this.map) {
      const newCenter = new this.kakao.maps.LatLng(position.lat, position.lng);
      this.map.setCenter(newCenter);
      this.addUserMarker(position);
    }
  }

  // 사용자 위치 마커 추가 메서드
  addUserMarker(position) {
    // 이미 존재하는 사용자 위치 마커가 있다면 지도에서 제거
    if (this.userMarker) {
      this.userMarker.setMap(null);
    }

    // 새로운 사용자 위치 마커 생성 및 지도에 추가
    const marker = new this.kakao.maps.Marker({
      position: new this.kakao.maps.LatLng(position.lat, position.lng),
      map: this.map
    });
    this.userMarker = marker; // 사용자 위치 마커 저장
  }

  // 검색 반경 설정 메서드
  setRadius(radius) {
    if (this.radiusOptions.includes(radius)) {
      this.currentRadius = radius;
    } else {
      console.warn('유효하지 않은 검색 반경입니다.');
    }
  }

  // 장소 검색 메서드
  searchPlaces(keyword) {
    // 사용자 위치가 설정되지 않았을 경우 알림 표시 후 반환
    if (!this.userPosition) {
      alert('사용자 위치를 먼저 설정해주세요.');
      return;
    }

    // 검색 옵션 설정
    const options = {
      location: new this.kakao.maps.LatLng(this.userPosition.lat, this.userPosition.lng), // 검색 위치 설정
      radius: parseInt(this.currentRadius) // 현재 설정된 검색 반경 사용 (문자열을 숫자로 변환)
    };

    // Kakao Places 서비스를 통한 키워드 검색 요청
    this.ps.keywordSearch(keyword, this.placesSearchCB.bind(this), options);
  }

  // 장소 검색 결과 콜백 메서드
  placesSearchCB(data, status, pagination) {
    // 검색 상태에 따라 처리
    if (status === this.kakao.maps.services.Status.OK) {
      const sortedPlaces = this.sortPlacesByDistance(data); // 거리순으로 장소 정렬
      this.setPlaces(sortedPlaces); // 검색 결과를 상태로 설정하는 콜백 호출
      this.displayPlaces(sortedPlaces); // 검색 결과를 지도와 리스트에 표시
      this.displayPagination(pagination); // 페이지네이션 표시
    } else if (status === this.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      this.setPlaces([]); // 검색 결과 초기화
    } else if (status === this.kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
      this.setPlaces([]); // 검색 결과 초기화
    }
  }

  // 검색 결과 표시 메서드
  displayPlaces(places) {
    const bounds = new this.kakao.maps.LatLngBounds(); // 지도 영역 설정 객체

    // 모든 마커 제거
    this.removeMarker();

    // 각 장소에 대해 마커 추가
    for (let i = 0; i < places.length; i++) {
      const position = new this.kakao.maps.LatLng(places[i].y, places[i].x);
      const marker = this.addMarker(position, i); // 마커 추가

      // 마커 클릭 시 인포윈도우 표시
      this.kakao.maps.event.addListener(marker, 'click', () => {
        this.displayInfowindow(marker, places[i].place_name);
      });

      bounds.extend(position); // 지도 영역 확장
    }

    this.map.setBounds(bounds); // 지도 영역 설정
  }

  // 마커 추가 메서드
  addMarker(position, idx) {
    // 마커 이미지 설정
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    const imageSize = new this.kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new this.kakao.maps.Size(36, 691),
      spriteOrigin: new this.kakao.maps.Point(0, (idx * 46) + 10),
      offset: new this.kakao.maps.Point(13, 37)
    };
    const markerImage = new this.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

    // 마커 생성 및 설정
    const marker = new this.kakao.maps.Marker({
      position,
      image: markerImage
    });

    marker.setMap(this.map); // 마커 지도에 추가
    this.markers.push(marker); // 마커 배열에 추가

    return marker; // 생성한 마커 반환
  }

  // 모든 마커 제거 메서드
  removeMarker() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null); // 각 마커를 지도에서 제거
    }
    this.markers.length = 0; // 마커 배열 초기화
  }

 // 페이지네이션 표시 메서드
 displayPagination(pagination) {
  const paginationEl = document.getElementById('pagination'); // 페이지네이션을 표시할 HTML 요소 참조

  // paginationEl 요소가 존재하는지 확인
  if (!paginationEl) {
    console.warn('페이지네이션 요소를 찾을 수 없습니다.');
    return;
  }

  const fragment = document.createDocumentFragment(); // Fragment 생성

  // 기존의 페이지네이션 요소 제거
  while (paginationEl.hasChildNodes()) {
    const child = paginationEl.lastChild;
    if (child && paginationEl.contains(child)) {
      paginationEl.removeChild(child);
    }
  }

  // 페이지 버튼 생성 및 설정
  for (let i = 1; i <= pagination.last; i++) {
    const el = document.createElement('a');
    el.href = "#";
    el.innerHTML = i;

    if (i === pagination.current) {
      el.className = 'on'; // 현재 페이지에 해당하는 버튼 스타일 설정
    } else {
      el.onclick = ((i) => {
        return () => {
          pagination.gotoPage(i); // 클릭 시 해당 페이지로 이동
        };
      })(i);
    }

    fragment.appendChild(el);
  }
  paginationEl.appendChild(fragment);
}

  // 인포윈도우 표시 메서드
  displayInfowindow(marker, title) {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
    this.infowindow.setContent(content);
    this.infowindow.open(this.map, marker);
  }

  // 리스트 아이템 생성 메서드
  getListItem(index, places) {
    const el = document.createElement('li');
    let itemStr = `
      <span class="markerbg marker_${index + 1}"></span>
      <div class="info">
        <h5>${places.place_name}</h5>
    `;

    if (places.road_address_name) {
      itemStr += `
        <span>${places.road_address_name}</span>
        <span class="jibun gray">${places.address_name}</span>
      `;
    } else {
      itemStr += `<span>${places.address_name}</span>`;
    }

    itemStr += `
      <span class="tel">${places.phone}</span>
      </div>
    `;

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
  }

  // 노드의 모든 자식 노드 제거 메서드
  removeAllChildNodes(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }

  // 장소를 거리순으로 정렬하는 메서드
  sortPlacesByDistance(places) {
    return places.sort((a, b) => {
      const distanceA = this.calculateDistance(this.userPosition.lat, this.userPosition.lng, a.y, a.x);
      const distanceB = this.calculateDistance(this.userPosition.lat, this.userPosition.lng, b.y, b.x);
      return distanceA - distanceB;
    });
  }

  // 두 지점 간의 거리 계산 메서드
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 지구의 반경 (단위: km)
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  // 도(degree)를 라디안(radian)으로 변환하는 메서드
  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

export default MapService;
