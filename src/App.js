import logo from './logo.svg';
import {supabase} from './supabase.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Email from './email.js';
import Password from './password.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Email/>} />
        <Route path="/resetpassword" element={<Password/>} />
      </Routes>
    </Router>
  );
};

export default App;
