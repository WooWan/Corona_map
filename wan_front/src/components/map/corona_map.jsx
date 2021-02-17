import './corona_map.css'
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Patient_list from './patient_list';

/*global kakao*/
const Corona_Map = ({ location, update_patient, patients, delete_patient }) => {
	const [startDate, setStartDate] = useState(new Date());
	const [place, setPlace] = useState({ name: '강남구청', jibun: '서울 강남구 삼성동 16-1', coordinate_y: '37.518944466469215', coordinate_x: '127.04700555285855', phone: '02-3423-5114' })
	const update=()=>{
		console.log('update')
		update_patient({
			name: place.name,
			coordinate_y: place.coordinate_y,
			coordinate_x: place.coordinate_x,
			phone: place.phone
		});
	}
	// const submit_patient = (event) => {
	// 	onSubmit({
			// name: place.name,
			// date: getDate(),
			// coordinate_y: place.coordinate_y,
			// coordinate_x: place.coordinate_x,
			// phone: place.phone
	// 	})
	// }


	// const getDate = () => {
	// 	const year = startDate.getFullYear()
	// 	const month = startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1) : startDate.getMonth()
	// 	const day = startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate()
	// 	const temp = `${year}-${month}-${day}`;
	// 	return temp;
	// }

	useEffect(() => {
		var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
			mapOption = {
				center: new kakao.maps.LatLng(37.518944466469215, 127.04700555285855), // 지도의 중심좌표
				level: 4 // 지도의 확대 레벨
			};

		// 지도를 생성합니다    
		var map = new kakao.maps.Map(mapContainer, mapOption);
		// 장소 검색 객체를 생성합니다
		var ps = new kakao.maps.services.Places();
		//location: 검색한 장소
		const search_key = location;
		// 키워드로 장소를 검색합니다
		ps.keywordSearch(search_key, placesSearchCB);
		for (var i = 0; i < patients.length; i++) {
			confirmed_marker(patients[i]);
		}
		// console.log(place)
		// 키워드 검색 완료 시 호출되는 콜백함수 입니다
		function placesSearchCB(data, status, pagination) {
			if (status === kakao.maps.services.Status.OK) {
				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				// console.log(data[0])
				displayMarker(data[0]);
				map.setLevel(4);
			}
		}

		// 지도에 마커를 표시하는 함수입니다
		function displayMarker(place) {
			map.setCenter(new kakao.maps.LatLng(place.y, place.x));
			var markerPosition = new kakao.maps.LatLng(place.y, place.x);

			getListItem(place);
			var marker = new kakao.maps.Marker({
				position: markerPosition
			});
			marker.setMap(map);
		}
		//커스텀 오버레이 생성
		function confirmed_marker(place) {
			map.setCenter(new kakao.maps.LatLng(place.coordinate_y, place.coordinate_x));
			var markerPosition = new kakao.maps.LatLng(place.coordinate_y, place.coordinate_x);
			var imageSrc = 'images/do.png', // 마커이미지의 주소입니다    
				imageSize = new kakao.maps.Size(17, 17), // 마커이미지의 크기입니다
				imageOption = { offset: new kakao.maps.Point(7, 27) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

			var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
				markerPosition = new kakao.maps.LatLng(place.coordinate_y, place.coordinate_x); // 마커가 표시될 위치입니다

			// 마커를 생성하고 지도에 표시합니다
			var marker = new kakao.maps.Marker({
				map: map,
				position: markerPosition,
				image: markerImage,
			});
			marker.setMap(map);

			var content = '<div class="patient_wrap">' +
				'    <div class="info">' +
				'	<div class="patient_title_wrap"> ' +
				`        <div class="patient_title">${place.place}</div>` +
				'	</div>  ' +
				'        <div class="patient_body">' +
				`			<div class="patient phone">전화번호: ${place.phone}</div> ` +
				'        </div>' +
				'    </div>' +
				'</div>';
			// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
			kakao.maps.event.addListener(marker, 'click', function () {
				overlay.setMap(map);
			});
			kakao.maps.event.addListener(map, 'click', function () {
				overlay.setMap(null);
			});
			var overlay = new kakao.maps.CustomOverlay({
				content: content,
				position: marker.getPosition(),
				xAnchor: 0.45,
				yAnchor: 1.5,
			});
		}
		function getListItem(patient_place) {
			setPlace({
				name: patient_place.place_name,
				jibun: patient_place.address_name,
				coordinate_y: patient_place.y,
				coordinate_x: patient_place.x,
				phone: patient_place.phone,
			})
			update(place);
		}
	},[])
	return (
		<div className="corona_map">
			<div className="map" id="map" style={{height: "100vh" }} ></div>
			{/* <div className="search_list" id="search_list">
				<h2 className="confirmed_info">확진자 정보</h2>
				<h4 className="confirmed_date">방문일자</h4>
				<DatePicker
					selected={startDate}
					onChange={date => setStartDate(date)}
					inline
					dateFormat="yyyy.MM.dd(eee)"
				/>
				<h4 className="place">현재 위치</h4>
				<ul className="confirmed_place" id="confirmed_place">
					<li><strong>{place.name}</strong></li>
					<li>{place.jibun}</li>
				</ul>
				<input className="add_btn" type="submit" onClick={submit_patient} value="동선 추가하기" />
				{patients.slice(patients.length-4,patients.length).map(patient => (
					<Patient_list
						key={patient.id}
						patient={patient}
						delete_patient={delete_patient}
					/>
				))}
			</div> */}
		</div>
	);
};

export default Corona_Map;