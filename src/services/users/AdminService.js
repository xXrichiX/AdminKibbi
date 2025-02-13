import api from '../config/Api';

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
export const getAdminById = async (adminId) => {
    try {
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