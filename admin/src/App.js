import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';

import Home from './pages/Home/Home';
import Faq from './pages/Faq';
import store from './store';
import { loadMiningServers } from './actions/miningServer'

function App() {

  useEffect(() => {
   
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadMiningServers());
    
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/faq" exact element={<Faq />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
