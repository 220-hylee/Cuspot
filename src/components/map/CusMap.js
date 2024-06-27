import React,{ useRef, useEffect, useState } from "react";
import Style from "../../Style";
import { Grid } from "@material-ui/core";
import Header from "../header/Header";
import './Map.css';


const CusMap = () => {
  const mapRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  
  
  useEffect(() => {
    const { kakao } = window;

    if (!mapRef.current) return;

    const mapContainer = mapRef.current; // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const markers = [];

    const searchPlaces = () => {

      ps.keywordSearch(keyword, placesSearchCB);
    };

    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    };

    const displayPlaces = (places) => {
      const listEl = document.getElementById('placesList');
      const bounds = new kakao.maps.LatLngBounds();

      removeAllChildNodes(listEl);
      removeMarker();

      const fragment = document.createDocumentFragment();

      for (let i = 0; i < places.length; i++) {
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        const marker = addMarker(placePosition, i);
        const itemEl = getListItem(i, places[i]);

        bounds.extend(placePosition);

        kakao.maps.event.addListener(marker, 'mouseover', () => {
          displayInfowindow(marker, places[i].place_name);
        });

        kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close();
        });

        itemEl.onmouseover = () => {
          displayInfowindow(marker, places[i].place_name);
        };

        itemEl.onmouseout = () => {
          infowindow.close();
        };

        fragment.appendChild(itemEl);
      }

      listEl.appendChild(fragment);
      map.setBounds(bounds);
    };

    const addMarker = (position, idx) => {
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
      const imageSize = new kakao.maps.Size(36, 37);
      const imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691),
        spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
        offset: new kakao.maps.Point(13, 37)
      };
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

      const marker = new kakao.maps.Marker({
        position,
        image: markerImage
      });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    };

    const removeMarker = () => {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers.length = 0;
    };

    const displayPagination = (pagination) => {
      const paginationEl = document.getElementById('pagination');
      const fragment = document.createDocumentFragment();

      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    };

    const displayInfowindow = (marker, title) => {
      const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
      infowindow.setContent(content);
      infowindow.open(map, marker);
    };

    const getListItem = (index, places) => {
      const el = document.createElement('li');
      let itemStr = `<span class="markerbg marker_${index + 1}"></span>
                      <div class="info">
                        <h5>${places.place_name}</h5>`;

      if (places.road_address_name) {
        itemStr += ` <span>${places.road_address_name}</span>
                     <span class="jibun gray">${places.address_name}</span>`;
      } else {
        itemStr += ` <span>${places.address_name}</span>`;
      }

      itemStr += ` <span class="tel">${places.phone}</span>
                  </div>`;

      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    };

    const removeAllChildNodes = (el) => {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    };

    // 지도 초기화 시 한 번만 실행
    searchPlaces();
  }, [keyword]);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (e.target.keyword.value == "") {
        alert('키워드를 입력해주세요!');
        return;
      }
      setKeyword(e.target.keyword.value); 

  };

  
  const classes = Style();
  return (
    <div>
      <Grid className={classes.app}>
        <Grid item container className={classes.app__header}>
          <Header />
        </Grid>
      </Grid>

      <div className="map_wrap">
      <div id="map" ref={mapRef} style={{ width: '100%', height: '180%', position: 'relative', overflow: 'hidden' }}></div>

      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <form onSubmit={handleSearchSubmit}>
              키워드 : <input type="text" id="keyword" name="keyword" size="15" />
              <button type="submit">검색하기</button>
            </form>
          </div>
        </div>
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
    </div>
  );
};

export default CusMap;
