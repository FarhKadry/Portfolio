import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/home';
import LaunchScreen from './pages/LaunchScreen';
function Paths() {
    return (

    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LaunchScreen />} />
    </Routes>
    </BrowserRouter>
    );
}
 
export default Paths;