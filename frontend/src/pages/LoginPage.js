import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { username, password }
      );

      if (response && response.data && response.data.token) {
        // Save token in localStorage
        localStorage.setItem('adminToken', response.data.token);

        // Update App.js user state
        const userData = {
          name: username, // you can also use response.data.user.name if backend provides
          token: response.data.token,
          isAdmin: true, // backend login is for admin only
        };
        onLogin(userData);

        // Redirect to homepage or admin dashboard
        navigate('/admin');
      } else {
        setError('Login failed. No token received.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '100px 10%', maxWidth: '500px', margin: 'auto' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: '#fff',
            borderRadius: '0.375rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && (
          <p className="status-message error" style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
