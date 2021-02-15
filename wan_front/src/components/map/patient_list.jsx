import React from 'react';
import './patient_list.css'
const Patient_list = ({patient,delete_patient}) => {
	const onClick=()=>{
		delete_patient(patient);
	}
	return (
		<div className="patient_info">
			<h4 className="patient_place">{patient.place}</h4>
			<h5 className="patient_date">{patient.date}</h5>
			<input type="submit" value="동선 삭제" onClick={onClick}/>
		</div>
	);
};

export default Patient_list;