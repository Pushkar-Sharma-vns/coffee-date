import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CoffeeDateInvite from './pages/CoffeeDate';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      {/* <CoffeeDateInvite /> */}
      <BrowserRouter>
      <Routes>
        <Route path="/coffee-invite" element={<CoffeeDateInvite/>} />
        <Route path="/" element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
