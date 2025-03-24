import { useState } from "react";

import "./Form.css";

const AddBoardForm = ({ setShowAddBoardForm, addBoard, setLoading }) => {
    // State para o valor do input
    const [newBoardTitle, setNewBoardTitle] = useState("");

    // State para erros
    const [titleError, setTitleError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página

        // Validação do titulo
        if (newBoardTitle === "") {
            setTitleError(true);
            return;
        }

        addBoard(newBoardTitle); // Chamando a função addBoard com o valor do input como parâmetro
        setShowAddBoardForm(false); // Fechando o formulário
        // setLoading(true);
    };

    return (
        <>
            <div
                className="fade"
                onClick={() => setShowAddBoardForm(false)}
            ></div>
            <div className="container-form">
                <h2>Adicionar novo painel</h2>

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
                        <label htmlFor="title">Titulo</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Digite o titulo do painel aqui"
                            value={newBoardTitle}
                            onChange={(e) => setNewBoardTitle(e.target.value)}
                        />
                        <span>Digite o titulo para prosseguir</span>
                    </div>
                    <button type="submit" className="submit-btn">
                        Criar painel
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBoardForm;
