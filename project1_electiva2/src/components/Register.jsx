import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Register.css";

const Register = ({ setIsAuthenticated, setToken }) => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
    const response = await axios.post(
        "https://api-nodejs-da74.onrender.com/users",
        {
    name,
    email,
    password,
        }
);

      // Si el registro es exitoso, inicia sesión automáticamente
if (response.data && response.data.status === "success") {
        setToken(response.data.data.token); // Asegúrate de que la API envía un token en la respuesta
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.data.token);
        navigate("/productos");
} else {
        setError("Respuesta inválida del servidor");
    }
    } catch (error) {
    console.error("Error en el registro:", error);
    setError(
        error.response?.data?.message ||
        "Error en el registro. Por favor, intente de nuevo."
    );
    }
};

return (
    <div className="form-register">
    &nbsp;
    <h2 className="text-center">Registrarse</h2>
    {error && <p style={{ color: "red" }}>{error}</p>}
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        </div>
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
        <button type="submit" className="btn btn-custom btn-block">
        Registrarse
        </button>
    </form>
    </div>
);
};

export default Register;
