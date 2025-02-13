import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Crear el contexto de autenticación
export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    user: null,
    setUser: () => { },
});

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
    const [user, setUser] = useState(null); // Estado del usuario


    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);

    return (
        // Aquí estamos proporcionando el contexto a los componentes hijos
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children} {/* Aquí se pasa todo lo que esté dentro del AuthProvider */}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validar que 'children' es necesario y puede ser cualquier tipo de nodo
};