import React, { useRef } from 'react';
import './search_bar.css'
const Search_bar = (props) => {
	const inputRef = useRef();
	const handleSearch=()=>{
		const value= inputRef.current.value;
		props.onSearch(value);
		inputRef.current.value = '';
	}
	const onKeyPress =(event)=>{
		if (event.key=='Enter'){
			handleSearch()
		}
	}
	const onClick=()=>{
		handleSearch()
	}
	return (
		<div className="header">
			<div className="wrapper">
				<input
					ref={inputRef}
					type="search" placeholder="목적지를 검색해주세요" onKeyPress={onKeyPress} />
				<button className="searchButton" type="submit" onClick={onClick}>
					<img src="/images/search.svg" alt="search" />
				</button>
			</div>
			<ul className="category">
				<li className="hospital">
					<img src="/images/hospital.svg" alt="hospital"/>
					<span>선별 진료소</span>
				</li>
				<li className="gps">
					<img src="/images/gps.svg" alt=""/>
					<span>나의 위치</span>
				</li>
			</ul>
		</div>
	);
};

export default Search_bar;
