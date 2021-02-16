import React, { useCallback, useEffect, useState } from 'react';
import Corona_Map from './map/corona_map';
import Search_bar from './search_bar/search_bar';
import './appLayOut.css';
import Rest from './service/rest';
import axios from 'axios';

const instance = axios.create({
	baseURL: "http://127.0.0.1:8000/api/",
});
const rest = new Rest(instance);

function AppLayOut() {
	const [patients, setPatients] = useState([]);
	const [location, setLocation] = useState('강남구청');

	useEffect(() => {
		rest.get_patients()
			.then(response => setPatients(response.data))
	}, [rest])
	const update_patients = () => {
		rest.get_patients()
			.then(response => setPatients(response.data))
		console.log(patients);
	}
	const submit_patient = useCallback(
		(place) => {
			console.log(place);
			rest.post_patient(place.name, place.date, place.coordinate_y, place.coordinate_x, place.phone)
			update_patients();
		},
		[rest],
	)
	const delete_patient = useCallback(
		patient => {
			rest.delete_patient(patient);
			update_patients();
		}, [rest],
	)

	const search = (query) => {
		setLocation(query)
	}

	return (
		<div className="main">
			<Search_bar onSearch={search} />
			<Corona_Map location={location} onSubmit={submit_patient} delete_patient={delete_patient} patients={patients} />
		</div>

	);
}

export default AppLayOut;