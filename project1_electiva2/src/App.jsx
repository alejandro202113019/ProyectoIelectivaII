import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Productos from './components/Productos';
import AgregarProducto from './components/AgregarProducto';
import ActualizarProducto from './components/ActualizarProducto';
import Register from './components/Register';
import Categorias from './components/Categorias'; 
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [token, setToken] = React.useState('');

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken('');
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
    window.location.href = '/'; // Redirigir a la página de inicio
  };

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <div className="main-content">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/productos" />
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} setToken={setToken} />
                  )
                }
              />
              <Route 
                path="/register" 
                element={<Register setIsAuthenticated={setIsAuthenticated} setToken={setToken} />} 
              />
              <Route
                path="/productos"
                element={isAuthenticated ? <Productos token={token} /> : <Navigate to="/" />}
              />
              <Route
                path="/productos/agregar"
                element={isAuthenticated ? <AgregarProducto token={token} /> : <Navigate to="/" />}
              />
              <Route
                path="/productos/actualizar/:id"
                element={isAuthenticated ? <ActualizarProducto token={token} /> : <Navigate to="/" />}
              />
              <Route
                path="/categorias"
                element={isAuthenticated ? <Categorias token={token} /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
