import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgregarProducto = ({ token }) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    description: '',
    value: 0,
    category: '',
  });
  const [categorias, setCategorias] = useState([]); // Para almacenar las categorías disponibles
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategorias(); // Obtener categorías cuando el componente se monta
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('https://api-nodejs-da74.onrender.com/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategorias(response.data); // Almacenar las categorías en el estado
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const agregarProducto = async () => {
    try {
      // Crear el producto
      const productoResponse = await axios.post('https://api-nodejs-da74.onrender.com/products', nuevoProducto, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const productoId = productoResponse.data._id; // Obtener el ID del producto creado
      const categoryId = nuevoProducto.category; // Obtener el ID de la categoría seleccionada

      // Asociar el producto a la categoría
      await axios.post(`https://api-nodejs-da74.onrender.com/categories/${categoryId}/product/${productoId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Navegar de vuelta a la lista de productos después de agregar
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

      {/* Dropdown para seleccionar la categoría */}
      <div className="input-group">
        <select
          value={nuevoProducto.category}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, category: e.target.value })}
          className="form-control"
        >
          <option value="">Seleccionar Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      <div className="btn-container">
        <button onClick={agregarProducto} className="btn btn-success">Agregar Producto</button>
        <button onClick={() => navigate('/productos')} className="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  );
};

export default AgregarProducto;
