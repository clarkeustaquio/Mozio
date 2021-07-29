import React, { useState, useEffect } from 'react'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Components
import NavComponent from './components/NavComponent';
import ProviderComponent from './components/ProviderComponent/ProviderComponent'
import ServiceComponent from './components/ServiceComponent/ServiceComponent';
import UserComponent from './components/ProviderComponent/UserComponent'

function App() {
  const [token, setToken] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('token') !== null){
        setToken(localStorage.getItem('token'))
    }
  }, [])

  return (
    <React.Fragment>
      <Router>
        <NavComponent setToken={setToken} token={token} />
        <Switch>
          <Route exact path="/">
            <ProviderComponent setToken={setToken} />
          </Route>
          <Route path="/service-area">
            <ServiceComponent />
          </Route>
          <Route path="/providers">
            <UserComponent />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
