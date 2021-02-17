import React from 'react';
import ReactDOM from 'react-dom';
// import App from './app';
import './index.css';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import Root from './pages/root';



ReactDOM.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
