import sccoer from "../../../assets/images/sccoer.png"; // 축구
import badminton from "../../../assets/images/badminton.png"; // 배드민턴
import fitness from "../../../assets/images/fitness.png"; // 헬스
import baseball from "../../../assets/images/baseball.png"; // 야구
import tennis from "../../../assets/images/tennis.png"; // 테니스 
import basketball from "../../../assets/images/basketball.png";
import volleyball from "../../../assets/images/volleyball.png";
import basic from "../../../assets/images/basicR.png";

class MapService {
  constructor(mapContainer, userPosition, setPlaces, initialKeyword = []) {
    this.mapContainer = mapContainer;  // 지도를 표시할 HTML 요소의 참조
    this.userPosition = userPosition;  // 사용자의 현재 위치 좌표
    // this.searchKeyword = searchKeyword;  // 사용자의 현재 위치 좌표
    this.setPlaces = setPlaces;        // 검색 결과 장소들을 설정할 상태 업데이트 함수
    this.kakao = window.kakao;         // Kakao 지도 API 객체
    this.markers = [];                 // 지도에 표시할 마커들을 관리할 배열
    this.userMarker = null;            // 사용자 위치를 나타내는 마커 객체
    this.map = null;                   // Kakao 지도 객체
    this.ps = null;                    // Kakao 장소 검색 서비스 객체
    this.infowindow = null;            // Kakao 인포윈도우 객체
    this.currentRadius = 10000;         // 현재 선택된 검색 반경
    this.keywords = initialKeyword;    // 초기 검색 키워드 배열
    this.selectedPlaces = [];          // Array to store selected places
    this.searchPosition = null;        // 사용자가 검색한 위치를 저장할 변수
  }

  initMap() {
    if (!this.kakao || !this.kakao.maps) {
      console.error('Kakao 지도 API가 로드되지 않았습니다.');
      return;
    }

    const mapOption = {
      center: this.userPosition
        ? new this.kakao.maps.LatLng(this.userPosition.lat, this.userPosition.lng)
        : new this.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3
    };

    this.map = new this.kakao.maps.Map(this.mapContainer, mapOption);
    this.ps = new this.kakao.maps.services.Places();
    this.infowindow = new this.kakao.maps.InfoWindow({ zIndex: 1 });

    if (this.userPosition) {
      this.addUserMarker(this.userPosition);
    }

    // 초기 검색 키워드로 장소 검색
    this.searchPlaces(this.keywords);
  }

  updateUserPosition(position) {
    this.userPosition = position;
    if (this.map) {
      const newCenter = new this.kakao.maps.LatLng(position.lat, position.lng);
      this.map.setCenter(newCenter);
      this.addUserMarker(position);
    }
  }

  updateSearchPosition(position) {
    this.searchPosition = position;
    if (this.map) {
      const newCenter = new this.kakao.maps.LatLng(position.lat, position.lng);
      this.map.setCenter(newCenter);
    }
  }

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

  setRadius(radius) {
    if (radius > 0) {
      this.currentRadius = radius;
    } else {
      this.currentRadius = null;
    }
  }
  // setRadius(radius) {
  //   if (radius > 0) {
  //     this.currentRadius = radius;
  //   } else {
  //     this.currentRadius = null;
  //   }
  // }
  searchPlaces(keywords, selectedOptions, searchPosition = null) {
    if (searchPosition) {
      this.updateSearchPosition(searchPosition);  // 검색 위치 업데이트
    }

    // Ensure keywords is an array
    if (!Array.isArray(keywords)) {
      keywords = [keywords];
    }

    const searchLoc = this.searchPosition || this.userPosition;
    if (!searchLoc) {
      alert('사용자 위치를 먼저 설정해주세요.');
      return;
    }

    this.removeMarker(); // 이전 마커 제거

    const allResults = [];
    let completedRequests = 0;

    keywords.forEach((keyword) => {
      const options = {
        location: new this.kakao.maps.LatLng(searchLoc.lat, searchLoc.lng),
        radius: 10000
      };

      this.ps.keywordSearch(keyword, (data, status) => {
        completedRequests++;
        if (status === this.kakao.maps.services.Status.OK) {
          const keywordResults = data.map(place => ({ ...place, keyword })); // 키워드를 포함한 데이터
          allResults.push(...keywordResults);
        }

        // 모든 검색 요청이 완료된 후 결과 처리
        if (completedRequests === keywords.length) {
          const uniqueResults = this.getUniqueResults(allResults);
          const sortedPlaces = this.sortPlacesByDistance(uniqueResults);
          this.setPlaces(sortedPlaces);
          this.displayPlaces(sortedPlaces); // 키워드 전달
        }
      }, options);
    });
  }


  getUniqueResults(results) {
    const uniquePlaces = [];
    const placeIds = new Set();

    results.forEach((place) => {
      if (!placeIds.has(place.id)) {
        placeIds.add(place.id);
        uniquePlaces.push(place);
      }
    });

    return uniquePlaces;
  }

  setCenter(place) {
    const position = new this.kakao.maps.LatLng(place.y, place.x);
    this.map.setCenter(position);
    this.displayInfowindow(new this.kakao.maps.Marker({
      position: position,
      map: this.map,
      image: new this.kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
        new this.kakao.maps.Size(1, 1),
        {
          offset: new this.kakao.maps.Point(12, 35)
        }
      ),
      zIndex: -100
    }), place);
  }

  sortPlacesByDistance(places) {
    const sortedPlaces = places.map(place => {
      const distance = this.calculateDistance(this.searchPosition || this.userPosition, { lat: place.y, lng: place.x });
      return { ...place, distance };
    }).sort((a, b) => a.distance - b.distance);

    return sortedPlaces;
  }

  calculateDistance(pos1, pos2) {
    const latDiff = Math.abs(pos1.lat - pos2.lat);
    const lngDiff = Math.abs(pos1.lng - pos2.lng);
    return Math.sqrt(latDiff ** 2 + lngDiff ** 2);
  }

  displayPlaces(places) {
    const bounds = new this.kakao.maps.LatLngBounds();

    this.removeMarker();

    places.forEach((place) => {
      const position = new this.kakao.maps.LatLng(place.y, place.x);
      const keyword = place.keyword; // place 객체에 저장된 키워드 사용
      const marker = this.addMarker(position, keyword || "축구"); // 키워드 전달

      this.kakao.maps.event.addListener(marker, 'click', () => {
        this.displayInfowindow(marker, place);
      });

      bounds.extend(position);
    });

    this.map.setBounds(bounds);
  }

  addMarker(position, keyword) {
    let imageSrc = basic;
    let imageSize = new this.kakao.maps.Size(36, 37);

    if (keyword.includes("축구")) {
      imageSrc = sccoer;
    } else if (keyword.includes("배드민턴")) {
      imageSrc = badminton;
    } else if (keyword.includes("야구")) {
      imageSrc = baseball;
    } else if (keyword.includes("테니스")) {
      imageSrc = tennis;
    } else if (keyword.includes("헬스")) {
      imageSrc = fitness;
    } else if (keyword.includes("농구")) {
      imageSrc = basketball;
    } else if (keyword.includes("배구")) {
      imageSrc = volleyball;
    }

    const markerImage = new this.kakao.maps.MarkerImage(imageSrc, imageSize);

    const marker = new this.kakao.maps.Marker({
      position,
      image: markerImage
    });

    marker.setMap(this.map);
    this.markers.push(marker);

    return marker;
  }

  removeMarker() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

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

  displayInfowindow(marker, place) {
    const content = `
      <div class="info-window">
        <div class="info-window-header">
          <h4 class="info-window-title">${place.place_name}</h4>
          <button class="info-window-close">X</button>
        </div>
        <div class="info-window-body">
          <div class="info-window-details">
            <p class="info-window-address">${place.road_address_name || place.address_name}</p>
            <a href="${place.place_url}" target="_blank" class="info-window-link">상세보기</a>
          </div>
        </div>
      </div>
    `;
    this.infowindow.setContent(content);
    this.infowindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());

    const infowindowCloseButton = document.querySelector('.info-window-close');
    if (infowindowCloseButton) {
      infowindowCloseButton.addEventListener('click', () => {
        this.infowindow.close();
      });
    }
  }
}

export default MapService;

