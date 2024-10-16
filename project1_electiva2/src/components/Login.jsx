import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

const Login = ({ setIsAuthenticated, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://api-nodejs-da74.onrender.com/login', {
        email,
        password
      });
      
      if (response.data && response.data.status && response.data.data.token) {
        setToken(response.data.data.token);
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.data.token);
        navigate('/productos');
      } else {
        setError('Respuesta inválida del servidor');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setError(error.response?.data?.message || 'Error de inicio de sesión. Por favor, intente de nuevo.');
    }
  };

  return (
    <div className="form-login">
      <h2 className="text-center">Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-custom btn-block">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
