import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <React.StrictMode>
    <App axios={axios} />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
