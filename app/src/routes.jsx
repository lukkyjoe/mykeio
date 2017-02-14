import React from 'react';
import Main from './main.jsx';
import Room from './room.jsx';
//remove SessionEditor when not testing
import SessionEditor from './host/SessionEditor.jsx';
import {render} from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router'; 

//change route path '/' to point back to {Main}
render(
  <Router history = {hashHistory}>
    <Route path='/' component={Main}/>
    <Route path='/:roomid' component={Room}/>
  </Router>
  , document.getElementById('app'));
