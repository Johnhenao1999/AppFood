import axios from "axios";

// Define la URL base de la API para entorno local
const localBaseUrl = "http://localhost:3000/api/v1";

// Define la URL base de la API para entorno de producción
const productionBaseUrl = "https://api-devtest-jah.vercel.app/api/v1";

// Obtén la URL base de la API dependiendo del entorno
const baseURL = window.location.hostname === 'localhost' ? localBaseUrl : productionBaseUrl;

// Crea una instancia de Axios con la URL base configurada
const instance = axios.create({
    baseURL,
    withCredentials: true,
});

export default instance;
