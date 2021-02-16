class Rest{
	constructor(rest_request){
		this.rest=rest_request
	}
	post_patient=(place,date,coordinate_y, coordinate_x,phone)=>{
		console.log(phone);
		const response = this.rest.post('patients/',{
			id:'111',
			place:place,
			date:date,
			coordinate_y:coordinate_y,
			coordinate_x: coordinate_x,
			phone:phone,
		})
		return response;
	}
	get_patients=()=>{
		const response= this.rest.get('patients/',{});
		return response;
	}
	delete_patient=(event)=>{
		const response = this.rest.delete(`patients/${event.id}`, {
    });
		return response
	}
}
export default Rest;