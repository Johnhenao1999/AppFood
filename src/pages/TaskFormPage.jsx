/* import { useForm } from "react-hook-form"
import { useTasks } from "../context/tasksContext"

function TaskFormPage() {

    const { register, handleSubmit } = useForm()
    const {createTask} = useTasks()

    const onSubmit = handleSubmit((data) => {
        createTask(data)
    })

    return (
        <div>
            <h1>Realiza tu pedido</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="title" {...register("title")} />
                <textarea name="" placeholder="descript" {...register("description")}></textarea>
                <button>Save</button>
            </form>
        </div>
    )
}

export default TaskFormPage */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/tasksContext";

function TaskFormPage() {
    const { register, handleSubmit } = useForm();
    const { createTask } = useTasks();
    const [salchipapas, setSalchipapas] = useState([
        { id: 1, name: "Salchipapa 1", description: "Descripción de la salchipapa 1", price: 5, sauces: ["Ketchup", "Mayonesa"], quantity: 0, status: "pending"},
        { id: 2, name: "Salchipapa 2", description: "Descripción de la salchipapa 2", price: 6, sauces: ["Ketchup", "Mostaza"], quantity: 0, status: "pending"},
        { id: 3, name: "Salchipapa 3", description: "Descripción de la salchipapa 3", price: 7, sauces: ["Mayonesa", "Mostaza"], quantity: 0, status: "pending"},
        { id: 4, name: "Salchipapa 4", description: "Descripción de la salchipapa 4", price: 8, sauces: ["Ketchup", "Salsa BBQ"], quantity: 0,  status: "pending"},
        { id: 5, name: "Salchipapa 5", description: "Descripción de la salchipapa 5", price: 9, sauces: ["Mostaza", "Salsa Picante"], quantity: 0 , status: "pending"},
    ]);

    const handleCheckboxChange = (id) => {
        const updatedSalchipapas = salchipapas.map(salchipapa => {
            if (salchipapa.id === id) {
                return { ...salchipapa, quantity: salchipapa.quantity === 0 ? 1 : 0 };
            }
            return salchipapa;
        });
        setSalchipapas(updatedSalchipapas);
    };

    const onSubmit = handleSubmit(() => {
        const selectedSalchipapas = salchipapas
            .filter(salchipapa => salchipapa.quantity > 0)
            .map(({ name, description, price, sauces, quantity, status }) => ({ name, description, price, sauces, quantity, status }));
        createTask(selectedSalchipapas);
        console.log(selectedSalchipapas);
    });

    return (
        <div>
            <h1>Realiza tu pedido</h1>
            <form onSubmit={onSubmit}>
                {salchipapas.map(salchipapa => (
                    <div key={salchipapa.id}>
                        <input
                            type="checkbox"
                            id={`salchipapa-${salchipapa.id}`}
                            checked={salchipapa.quantity > 0}
                            onChange={() => handleCheckboxChange(salchipapa.id)}
                        />
                        <label htmlFor={`salchipapa-${salchipapa.id}`}>
                            {salchipapa.name} - ${salchipapa.price}
                        </label>
                        <p>{salchipapa.description}</p>
                        <p>Salsas: {salchipapa.sauces.join(", ")}</p>
                        <input
                            type="number"
                            {...register(`salchipapa-${salchipapa.id}-quantity`)}
                            min="0"
                            max="10"
                            defaultValue="0"
                        />
                    </div>
                ))}
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default TaskFormPage;
