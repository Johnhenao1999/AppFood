// Define la URL base de la API utilizando una variable de entorno
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1";

// Crea una instancia de Axios con la URL base configurada
const instance = axios.create({
    baseURL,
    withCredentials: true,
});

export default instance;