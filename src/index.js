import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Config from './config';
import History from './components/history';
import Main from './components/main';
import './index.css';
import * as firebase from 'firebase';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

const config = {
  databaseURL: Config.firebase.url,
};
firebase.initializeApp(config);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ Main }/>
      <Route path="history" component={ History }/>
    </Route>
  </Router>
  ,
  document.getElementById('root')
);
