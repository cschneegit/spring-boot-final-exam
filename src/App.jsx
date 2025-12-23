
import './App.css';
import React from 'react';
import SearchForm from './components/form/SearchForm';
// import Table from './components/table/Table';
import Home from './components/pages/Home';
import AppNavbar from './components/navbar/AppNavbar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/suche' element={<SearchForm />}></Route>
      </Routes>
    </Router>
  )

}
export default App;