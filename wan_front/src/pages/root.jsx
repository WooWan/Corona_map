import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppLayOut from '../components/appLayOut';
import Admin from './admin';
import Test from './test';
import axios from 'axios';
import Rest from '../components/service/rest';


const instance = axios.create({
	baseURL: "http://127.0.0.1:8000/api/",
});
const rest = new Rest(instance);
const Root = () => {
	const [patients, setPatients] = useState([]);
	const [location, setLocation] = useState('강남구청');
	const [place, setPlace] = useState({ name: '강남구청', jibun: '서울 강남구 삼성동 16-1', coordinate_y: '37.518944466469215', coordinate_x: '127.04700555285855', phone: '02-3423-5114' })

	useEffect(() => {
		rest.get_patients()
			.then(response => setPatients(response.data))
	}, [rest])
	const update_patients = () => {
		console.log('update_patients')
		rest.get_patients()
			.then(response => setPatients(response.data))
	}
	const post_patient = useCallback(
		(place) => {
			console.log(place)
			rest.post_patient(place.name, place.date, place.coordinate_y, place.coordinate_x, place.phone)
			update_patients();
		},
		[rest],
	)
	const delete_patients = useCallback(
		patient => {
			rest.delete_patient(patient);
			update_patients();
			console.log('delete')
		}, [rest],
	)
	const current_place=(value)=>{
		console.log(value)
		setPlace(value)
	}
	const onSearch = (query) => {
		setLocation(query)
	}
	return (
		<Router>
			<AppLayOut onSubmit={post_patient} delete_patient={delete_patients} search={onSearch} patients={patients} location={location} update={current_place} >
				<Route exact path='/test' render={(props) => <Test onSubmit={post_patient} delete_patient={delete_patients} {...props} patients={patients} place={place} />} /> 
			</AppLayOut>
			{/* <Home>
				<Route exact path='/test' render={(props) => <Test {...props} patients={patients} />} /> 
			</Home> */}
			{/* <Route exact path='/test' render={(props) => <Test {...props} patients={patients} />} /> */}
			{/* <Route exact path='/test' render={(props) => <Test {...props} patients={patients} />} /> */}
			{/* <AppLayOut>
				<Route exact path='/' component={Home} />
				<Route exact path='/admin' component={Admin} />
				<Route exact path='/test' render={(props) => <Test {...props} patients={patients} />} />
			</AppLayOut> */}
		</Router>
		
		
	);
};

export default Root;