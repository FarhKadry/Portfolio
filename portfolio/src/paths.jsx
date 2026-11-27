import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LaunchScreen from './pages/LaunchScreen';
import Home from './pages/Home';

function Paths() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LaunchScreen />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Paths;
