import axios from "./axios";

// Función para obtener el token de autenticación almacenado en el estado del usuario
const getToken = () => {
  return localStorage.getItem("token");
};


// Configuración de Axios para incluir el token en el encabezado de autorización en cada solicitud
axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Funciones de solicitud con Axios, ahora Axios incluirá automáticamente el token en el encabezado de autorización
export const getTasksRequest = async () => axios.get("/salchipapas");

export const createTaskRequest = async (task) => axios.post("/salchipapas", task);

export const updateTaskRequest = async (task) =>
  axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);

export const salchipapasList = async () => axios.get("/management/salchipapas-list");
