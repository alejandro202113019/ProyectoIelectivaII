import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Productos = ({ token }) => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('https://api-nodejs-da74.onrender.com/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`https://api-nodejs-da74.onrender.com/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto._id.includes(busqueda)
  );

  return (
    <div className="product-list">
      <h2>Productos</h2>
      <input
        className="form-control mb-4"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por nombre o ID"
      />

      <Link to="/productos/agregar" className="btn btn-primary mb-4">
        Agregar Producto
      </Link>

      <ul>
        {productosFiltrados.map((producto) => (
          <li key={producto._id}>
            <div>
              <h5>{producto.name}</h5>
              <p>{producto.description}</p>
              <p><strong>Precio:</strong> ${producto.value}</p>
            </div>
            <div>
              <Link to={`/productos/actualizar/${producto._id}`}>
                <button className="btn btn-warning btn-sm">Actualizar</button>
              </Link>
              <button
                className="btn btn-danger btn-sm ml-2"
                onClick={() => eliminarProducto(producto._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
