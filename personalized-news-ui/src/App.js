import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from './components/authentication.js';
import HomePage from './components/homepage.js';
import Page404 from './components/page404.js';
import PrivateRoutes from './components/private.js';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Authentication />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/Homepage' element={<HomePage />} />
      </Route>
      <Route path='*' element={<Page404 />} />
    </Routes>
  </Router>
  );
}

export default App;
