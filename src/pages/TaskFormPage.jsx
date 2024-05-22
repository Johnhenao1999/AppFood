import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/tasksContext";
import { useNavigate } from "react-router-dom";
import NavigationVertical from "../components/VerticalNavigation";
import Select from 'react-select';
import "../TaskFormPage.css"; // Importa el archivo CSS

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
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

  const handleSelectChange = (selectedOptions, name) => {
    setValue(name, selectedOptions);
  };

  const onSubmit = (data) => {
    const selectedItems = salchipapasList.filter((item) => selectedOptions[item._id]);
    const selectedItemsData = selectedItems.map((item) => ({
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: Number(data[`cantidad-${item._id}`]),
      sauces: data[`salsa-${item._id}`].map(option => option.value), // Extraer los valores de las salsas seleccionadas
    }));
    createTask(selectedItemsData);
    console.log("Datos enviados:", selectedItemsData);
    navigate("/tasks");
  };

  const sauceOptions = [
    { value: 'Mayonesa', label: 'Mayonesa' },
    { value: 'Ketchup', label: 'Ketchup' },
    { value: 'Mostaza', label: 'Mostaza' }
  ];

  return (
    <div className="task-form-page">
      <NavigationVertical />
      <div className="task-form-content">
        <h1>Realiza tu pedido</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Salsa</th>
                  <th>Seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {salchipapasList.map((salchipapa) => (
                  <tr key={salchipapa._id}>
                    <td>{salchipapa.name}</td>
                    <td>{salchipapa.description}</td>
                    <td>{salchipapa.price}</td>
                    <td>
                      <input type="number" {...register(`cantidad-${salchipapa._id}`)} placeholder="Cantidad" />
                    </td>
                    <td>
                      <Select
                        isMulti
                        options={sauceOptions}
                        onChange={(selectedOptions) => handleSelectChange(selectedOptions, `salsa-${salchipapa._id}`)}
                        className="select-multi"
                      />
                    </td>
                    <td className="label-check">
                      <label>
                        <input
                          type="checkbox"
                          {...register(`checkbox-${salchipapa._id}`)}
                          name={salchipapa._id}
                          checked={selectedOptions[salchipapa._id] || false}
                          onChange={handleCheckboxChange}
                        />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cards-container">
            {salchipapasList.map((salchipapa) => (
              <div className="card" key={salchipapa._id}>
                <h2>{salchipapa.name}</h2>
                <p>{salchipapa.description}</p>
                <p><strong>Precio:</strong> {salchipapa.price}</p>
                <input type="number" {...register(`cantidad-${salchipapa._id}`)} placeholder="Cantidad" />
                <Select
                  isMulti
                  options={sauceOptions}
                  onChange={(selectedOptions) => handleSelectChange(selectedOptions, `salsa-${salchipapa._id}`)}
                  className="select-multi"
                />
                <label className="label-check">
                  <input
                    type="checkbox"
                    {...register(`checkbox-${salchipapa._id}`)}
                    name={salchipapa._id}
                    checked={selectedOptions[salchipapa._id] || false}
                    onChange={handleCheckboxChange}
                  />
                  Seleccionar
                </label>
              </div>
            ))}
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
