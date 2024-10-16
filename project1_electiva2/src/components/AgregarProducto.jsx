import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgregarProducto = ({ token }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    description: '',
    value: 0,
    category: '',
  });
  const navigate = useNavigate();

  const agregarProducto = async () => {
    try {
      await axios.post('https://api-nodejs-da74.onrender.com/products', nuevoProducto, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/productos');
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Producto</h2>
      <div className="input-group">
        <input
          value={nuevoProducto.name}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })}
          className="form-control"
          placeholder="Nombre"
        />
      </div>
      <div className="input-group">
        <input
          value={nuevoProducto.description}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, description: e.target.value })}
          className="form-control"
          placeholder="Descripción"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          value={nuevoProducto.value}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, value: Number(e.target.value) })}
          className="form-control"
          placeholder="Valor"
        />
      </div>
      <div className="input-group">
        <input
          value={nuevoProducto.category}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, category: e.target.value })}
          className="form-control"
          placeholder="ID de Categoría"
        />
      </div>
      <div className="btn-container">
        <button onClick={agregarProducto} className="btn btn-success">Agregar Producto</button>
        <button onClick={() => navigate('/productos')} className="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  );
};

export default AgregarProducto;