import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AppLayOut from '../components/appLayOut';
import Admin from './admin';
import Home from './home';

const Root = () => {
	return (
		<AppLayOut>
			<Route exact path='/' component={Home} />
			<Route exact path='/admin' component={Admin} />
		</AppLayOut>
	);
};

export default Root;