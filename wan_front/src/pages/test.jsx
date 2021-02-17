
import React, { useState } from 'react';


import './test.css'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Patient_list from '../components/map/patient_list';
const Test = ({onSubmit,delete_patient, patients,place }) => {
	console.log(place);
	const [startDate, setStartDate] = useState(new Date());
	
	const onClick = () => {
		onSubmit({
			name: place.name,
			date: getDate(),
			coordinate_y: place.coordinate_y,
			coordinate_x: place.coordinate_x,
			phone: place.phone
		})
	}
	const getDate = () => {
		const year = startDate.getFullYear()
		const month = startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1) : startDate.getMonth()
		const day = startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate()
		const temp = `${year}-${month}-${day}`;
		return temp;
	}
	return (

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
			</ul>
			<input className="add_btn" type="submit" onClick={onClick} value="동선 추가하기" />
			{patients.slice(patients.length - 4, patients.length).map(patient => (
				<Patient_list
					key={patient.id}
					patient={patient}
					delete_patient={delete_patient}
				/>
			))}
		</div>
	);
};

export default Test;