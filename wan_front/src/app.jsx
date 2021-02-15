import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Root from './pages/root';
function App() {

	return (
		<Router>
			<Root />
		</Router>
	);
}

export default App;
