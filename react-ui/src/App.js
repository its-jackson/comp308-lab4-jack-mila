import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from './Home';
import FormPage from './FormPage';

function App() {
  return (
    <Router>
      <div> 
          <Route path="/" exact component={FormPage} /> 
          <Route path="/home" exact component={Home} /> 
      </div>
    </Router>
  );
}
export default App;
