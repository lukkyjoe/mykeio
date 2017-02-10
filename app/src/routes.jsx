import React from 'react';
import Main from './main.jsx';
import Room from './room.jsx';
import {render} from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router'; 

render(
  <Router history = {hashHistory}>
    <Route path='/' component={Main}/>
    <Route path='/:roomid' component={Room}/>
  </Router>
  , document.getElementById('app'));
