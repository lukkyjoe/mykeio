
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router'; 

import Home from './Home.jsx';
import EditorMain from './Editor/EditorMain.jsx';
import HostMain from './host/HostMain.jsx';
import ClientMain from './client/ClientMain.jsx';

render(
  <Router history = {hashHistory}>
    <Route path='/' component={Home}/>
    <Route path='/editor' component={EditorMain}/>
    <Route path='/host/:roomid' component={HostMain}/>
    <Route path='/:roomid' component={ClientMain}/>
  </Router>
  , document.getElementById('app'));
 