import api from '../config/Api'; // Ya maneja el token globalmente
import jwtDecode from 'jwt-decode';

// Obtener el ID del administrador desde el token
export const getAdminId = () => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error("No token found. User might not be authenticated.");
        }

        const decodedToken = jwtDecode(token);
        return decodedToken.id;
    } catch (error) {
        throw error.response?.data || { message: 'Error al obtener el id' };
    }
}

// Obtener todos los administradores
export const getAllAdmins = async () => {
    try {
        const response = await api.get('/admin');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error al obtener administradores' };
    }
};

// Obtener un administrador por ID
export const getAdminById = async () => {
    try {
        const adminId = getAdminId();

        const response = await api.get(`/admin/${adminId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Administrador no encontrado' };
    }
};

// Actualizar un administrador
export const updateAdmin = async (adminId, data) => {
    try {
        const response = await api.put(`/admin/${adminId}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error al actualizar' };
    }
};

// Eliminar un administrador
export const deleteAdmin = async (adminId) => {
    try {
        await api.delete(`/admin/${adminId}`);
        return { message: 'Administrador eliminado' };
    } catch (error) {
        throw error.response?.data || { message: 'Error al eliminar' };
    }
};

// Función para manejar el login
export const loginUser = async (data) => {
    try {
        const response = await api.post("/v1/user/login", data);
        const { token } = response.data;

        localStorage.setItem('token', token); // Guardar el token en localStorage
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error al loguear' };
    }
};