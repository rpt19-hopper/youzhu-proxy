import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './style.css';

ReactDOM.hydrate(<App/>, document.getElementById('proxy'))