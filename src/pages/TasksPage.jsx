import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import io from 'socket.io-client';

const isLocalhost = window.location.href.includes('localhost');
const socketUrl = isLocalhost ? 'http://localhost:3000' : 'https://api-devtest-jah.vercel.app';

const socket = io(socketUrl);

function TasksPage() {
    const { getTasks, tasks , setTasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    useEffect(() => {
        const handleTaskUpdated = (updatedTask) => {
            setTasks((prevTasks) => 
                prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
            );
        };

        // Escuchar eventos de WebSocket para actualizaciones de tareas
        socket.on('taskUpdated', handleTaskUpdated);

        // Limpiar el evento cuando el componente se desmonte
        return () => {
            socket.off('taskUpdated', handleTaskUpdated);
        };
    }, [setTasks]);

    useEffect(() => {
        // Desconectar el WebSocket cuando el componente se desmonte
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Pedidos realizados</h1>
            <div>
                {tasks.map(task => (
                    <div key={task._id}>
                        <h2>{task.name}</h2>
                        <p>{task.description}</p>
                        <p>Estado: {task.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TasksPage;
