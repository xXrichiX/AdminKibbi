import api from "../config/Api";

// Registrar un nuevo administrador
export const registerAdmin = async (email, password) => {
    try {
        const response = await api.post('/admin/register', { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error en el registro' };
    }
};

// Verificar el código y activar la cuenta
export const verifyAdmin = async (tempId, code) => {
    try {
        const response = await api.post('/admin/verify', { tempId, code });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error en la verificación' };
    }
};

// Iniciar sesión
export const loginAdmin = async (email, password) => {
    try {
        const response = await api.post('/admin/login', { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token); // Guardar el token en localStorage
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Credenciales incorrectas' };
    }
};

// Solicitar restablecimiento de contraseña
export const requestPasswordReset = async (email) => {
    try {
        const response = await api.post('/admin/request-password-reset', { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error al solicitar recuperación' };
    }
};

// Restablecer contraseña
export const resetPassword = async (email, code, newPassword) => {
    try {
        const response = await api.post('/admin/reset-password', { email, code, newPassword });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error al restablecer contraseña' };
    }
};