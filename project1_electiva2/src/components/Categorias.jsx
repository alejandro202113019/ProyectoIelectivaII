import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categorias = ({ token }) => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({ name: '', description: '' });
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('https://api-nodejs-da74.onrender.com/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const agregarCategoria = async () => {
    try {
      await axios.post('https://api-nodejs-da74.onrender.com/categories', nuevaCategoria, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategorias();
      setNuevaCategoria({ name: '', description: '' });
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      await axios.delete(`https://api-nodejs-da74.onrender.com/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  const actualizarCategoria = async (id, categoriaActualizada) => {
    try {
      await axios.put(`https://api-nodejs-da74.onrender.com/categories/${id}`, categoriaActualizada, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategorias();
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
    }
  };

  const categoriasFiltradas = categorias.filter(categoria =>
    categoria.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="categories-container">
      <h2>Categorías</h2>
      
      <div className="form-container">
        <h3>Agregar Nueva Categoría</h3>
        <div className="input-group">
          <input
            value={nuevaCategoria.name}
            onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, name: e.target.value })}
            className="form-control"
            placeholder="Nombre"
          />
        </div>
        <div className="input-group">
          <input
            value={nuevaCategoria.description}
            onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, description: e.target.value })}
            className="form-control"
            placeholder="Descripción"
          />
        </div>
        <button onClick={agregarCategoria} className="btn btn-primary">Agregar Categoría</button>
      </div>

      <div className="input-group mt-4">
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="form-control"
          placeholder="Buscar categoría"
        />
      </div>

      <ul className="categories-list">
        {categoriasFiltradas.map(categoria => (
          <li key={categoria._id}>
            <div>
              <strong>{categoria.name}</strong> - {categoria.description}
            </div>
            <div>
              <button onClick={() => eliminarCategoria(categoria._id)} className="btn btn-danger btn-sm">Eliminar</button>
              <button onClick={() => actualizarCategoria(categoria._id, { ...categoria, name: categoria.name + ' (Actualizado)' })} className="btn btn-warning btn-sm">
                Actualizar Nombre
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;