import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase';


const config = {
  apiKey: '',
  databaseURL: "https://crackling-torch-4400.firebaseio.com/"
};
firebase.initializeApp(config);

ReactDOM.render( < App / > ,
  document.getElementById('root')
);
