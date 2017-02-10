import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router'; 

render(
  <Router history = {hashHistory}>
    <Route path='/' component={main}/>
  </Router>
  , document.getElementById('app'));
