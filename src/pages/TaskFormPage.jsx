import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/tasksContext";
import { useNavigate } from "react-router-dom";

function TaskFormPage() {
    const { register, handleSubmit } = useForm();
    const { createTask, getSalchipapasList } = useTasks();
    const [salchipapasList, setSalchipapasList] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalchipapas = async () => {
            const list = await getSalchipapasList();
            setSalchipapasList(list);
        };
        fetchSalchipapas();
    }, [getSalchipapasList]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [name]: checked,
        }));
    };

    const onSubmit = (data) => {
        const selectedItems = salchipapasList.filter((item) => selectedOptions[item._id]);
        const selectedItemsData = selectedItems.map((item) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: Number(data[`cantidad-${item._id}`]),
            sauces: data[`salsa-${item._id}`].split(",").map((salsa) => salsa.trim()), // Convertir la cadena de salsa en un array
        }));
        createTask(selectedItemsData);
        console.log(createTask)
        console.log("Datos enviados:", selectedItemsData);
        navigate("/tasks");
        // Aquí puedes enviar los datos al método createTask
    };

    return (
        <div>
            <h1>Realiza tu pedido</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {salchipapasList.map((salchipapa) => (
                    <div key={salchipapa._id}>
                        <h2>{salchipapa.name}</h2>
                        <p>{salchipapa.description}</p>
                        <p>Precio: {salchipapa.price}</p>
                        <input type="number" {...register(`cantidad-${salchipapa._id}`)} placeholder="Cantidad" />
                        <input type="text" {...register(`salsa-${salchipapa._id}`)} placeholder="Salsa" />
                        <input
                            type="checkbox"
                            {...register(`checkbox-${salchipapa._id}`)}
                            name={salchipapa._id}
                            checked={selectedOptions[salchipapa._id] || false}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                ))}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default TaskFormPage;
