import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import NavigationVertical from "../components/VerticalNavigation";
import "../Pedidos.css"; // Importa el archivo CSS

function TasksPage() {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        // Initial fetch
        getTasks();

        // Set up polling
        const intervalId = setInterval(() => {
            getTasks();
        }, 10000); // Poll every 5 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [getTasks]);

    return (
        <div className="tasks-page-container">
            <NavigationVertical />
            <div className="tasks-table-container">
                <h1>Pedidos realizados por el usuario</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task._id}>
                                <td>{task.name}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TasksPage;
