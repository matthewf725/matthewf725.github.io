import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Paper1 from './pages/Paper1';
import Paper2 from './pages/Paper2';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/paper1" element={<Paper1 />} />
                <Route path="/paper2" element={<Paper2 />} />
            </Routes>
        </Router>
    );
}

export default App;
