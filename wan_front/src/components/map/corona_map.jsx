import './corona_map.css'
import React, { useEffect, useState } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Patient_list from './patient_list';

/*global kakao*/
const Corona_Map = ({location, onSubmit, patients, delete_patient}) => {
	console.log(patients);
	const [startDate, setStartDate] = useState(new Date());
	const [place, setPlace] = useState({ name: '강남구청', jibun:'서울 강남구 삼성동 16-1', coordinate_y:'37.518944466469215', coordinate_x:'127.04700555285855'})

	const submit_patient=(event)=>{
		console.log(place);
		// onSubmit(place,getDate());
		onSubmit({
			name:place.name,
			date:getDate(),
			coordinate_y: place.coordinate_y,
			coordinate_x: place.coordinate_x,
		})
	}

	
	const getDate=()=>{
		const year = startDate.getFullYear()
		const month = startDate.getMonth()+1<10? '0'+(startDate.getMonth()+1) :startDate.getMonth()
		const day = startDate.getDate()<10? '0'+startDate.getDate():startDate.getDate()
		const temp=`${year}-${month}-${day}`;
		return temp;
	}

	useEffect(() =>{
		console.log(patients);
		// console.log(lace.coordinate_x);
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
		const search_key=location;
		// 키워드로 장소를 검색합니다
		ps.keywordSearch(search_key, placesSearchCB);
		console.log(patients.length);
		for (var i = 0; i < patients.length; i++) {
			// console.log('work')
			// console.log(patients[i]);
			console.log('work');
			confirmed_marker(patients[i]);
		}
		
		// 키워드 검색 완료 시 호출되는 콜백함수 입니다
		function placesSearchCB(data, status, pagination) {
			if (status === kakao.maps.services.Status.OK) {
				// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
				displayMarker(data[0]);
				map.setLevel(4);
			}
		}

		// 지도에 마커를 표시하는 함수입니다
		function displayMarker(place) {
			// setCoordinate({y:place.y, x:place.x});
			// console.log(coordinate);
			map.setCenter(new kakao.maps.LatLng(place.y, place.x));
			var markerPosition = new kakao.maps.LatLng(place.y, place.x);

			getListItem(place);
			var marker = new kakao.maps.Marker({
				position: markerPosition
			});
			marker.setMap(map);
		}
		function confirmed_marker(place) {
			console.log(place);
			map.setCenter(new kakao.maps.LatLng(place.coordinate_y, place.coordinate_x));
			var markerPosition = new kakao.maps.LatLng(place.coordinate_y, place.coordinate_x);
			// 마커를 생성하고 지도에 표시합니다
			var marker = new kakao.maps.Marker({
				map: map,
				position: markerPosition,
			});
			marker.setMap(map);
		}
		function getListItem(place) {
			setPlace({
				name:place.place_name,
				jibun:place.address_name,
				coordinate_y:place.y,
				coordinate_x:place.x,
			})
		}
	},[location,patients])
	return (
		<div className="corona_map">
			<div className="map" id="map" style={{ width: "100vw", height: "100vh" }} ></div>	
			<div className="search_list" id="search_list">
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
				{patients.map(patient=>(
					<Patient_list
						key={patient.id}
						patient={patient}
						delete_patient={delete_patient}
					/>
				))}
			</div>
		</div>
	);
};

export default Corona_Map;