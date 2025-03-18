import { useState } from "react";

import { FaXmark } from "react-icons/fa6";

import "./Form.css";

const AddTaskForm = ({ setShowAddTaskForm, addTask }) => {
    // State's para os valores do formulário
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subtasks, setSubtasks] = useState([
        { id: 1, title: "", isDone: false },
    ]);

    // State para erros
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [subtaskError, setSubtaskError] = useState(false);

    // Função que atualiza o título da subtarefa conforme o usuário digita
    const handleSubtaskChange = (index, value) => {
        const newSubtasks = [...subtasks]; // Cria uma cópia do array de subtarefas
        newSubtasks[index].title = value; // Atualiza o título da subtarefa no índice correspondente
        setSubtasks(newSubtasks); // Define o novo array de subtarefas
    };

    // Função que adiciona uma nova subtarefa ao array de subtarefas
    const addSubtask = () => {
        setSubtasks([
            ...subtasks,
            { id: subtasks.length + 1, title: "", isDone: false },
        ]);
    };

    // Função que remove uma subtarefa com base no índice passado
    const removeSubtask = (index) => {
        // Filtra o array de subtarefas, removendo a subtarefa do índice passado
        setSubtasks(subtasks.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página

        let hasError = false; // Variável de controle de erro geral

        // Validação do título
        if (title === "") {
            setTitleError(true);
            hasError = true;
        } else {
            setTitleError(false);
        }

        // Validação da descrição
        if (description === "") {
            setDescriptionError(true);
            hasError = true;
        } else {
            setDescriptionError(false);
        }

        // Validação das subtarefas
        const subtaskErrorExists = subtasks.some(
            (subtask) => subtask.title === ""
        );
        if (subtaskErrorExists) {
            setSubtaskError(true);
            hasError = true;
        } else {
            setSubtaskError(false);
        }

        if (hasError) {
            return; // Se houver erro, interrompe o fluxo de envio
        }

        // Cria um novo objeto de tarefa com os valores preenchidos no formulário
        const newTask = {
            title,
            description,
            subtasks,
        };

        addTask(newTask); // Chama a função de adicionar tarefa
    };

    return (
        <>
            <div
                className="fade"
                onClick={() => setShowAddTaskForm(false)}
            ></div>
            <div className="container-form">
                <h2>Adicionar nova tarefa</h2>

                <form
                    method="post"
                    autoComplete="off"
                    className="form"
                    onSubmit={handleSubmit}
                >
                    <div
                        className={`input-container ${
                            titleError ? "error" : ""
                        }`}
                    >
                        <label htmlFor="title">Título</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Digite o título da tarefa aqui"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <span>Digite o titulo para prosseguir</span>
                    </div>

                    <div
                        className={`input-container ${
                            descriptionError ? "error" : ""
                        }`}
                    >
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Digite a descrição aqui"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span>Digite a descrição para prosseguir</span>
                    </div>

                    <div className="sub-container">
                        <span className="label">Subtarefas</span>
                        {subtasks.map((subtask, index) => (
                            <div
                                key={index}
                                className={`input-sub-container ${
                                    subtaskError ? "error" : ""
                                }`}
                            >
                                <div className="input-btn-container">
                                    <input
                                        type="text"
                                        name="subtask"
                                        placeholder="Digite sua subtarefa aqui"
                                        value={subtask.title}
                                        onChange={(e) =>
                                            handleSubtaskChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="delete-sub"
                                        onClick={() => removeSubtask(index)}
                                    >
                                        <FaXmark />
                                    </button>
                                </div>
                                <span>Digite o titulo para prosseguir</span>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="new-sub-btn"
                        onClick={addSubtask}
                    >
                        +Adicionar nova subtarefa
                    </button>
                    <button type="submit" className="submit-btn">
                        Criar tarefa
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddTaskForm;
