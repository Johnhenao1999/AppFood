import { useEffect, useCallback } from "react";
import { useTasks } from "../context/tasksContext";

function TasksPage() {
    const { getTasks, tasks } = useTasks();

    const stableGetTasks = useCallback(() => {
        getTasks();
    }, [getTasks]);

    useEffect(() => {
        stableGetTasks();
    }, [stableGetTasks]);

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
