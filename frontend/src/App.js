import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Education from './components/Education';

// Admin
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';

const PortfolioLayout = ({ isAdmin }) => (
  <>
    <Navbar />
    <main>
      <Home />
      <About />
      <Projects />
      <Education isAdmin={isAdmin} />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  const [user, setUser] = useState(null); // { name, isAdmin }

  const handleLogin = (userData) => {
    // userData = { name: 'Admin', token: 'xxxx', isAdmin: true }
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/admin"
            element={user?.isAdmin ? <AdminDashboard /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/*"
            element={<PortfolioLayout isAdmin={user?.isAdmin || false} />}
          />
        </Routes>

        {user && (
          <div style={{ position: 'fixed', top: 10, right: 10 }}>
            <span className="mr-2 font-semibold">{user.name}</span>
            <button
              onClick={handleLogout}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
