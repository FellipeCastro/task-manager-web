import { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import ConfirmModal from "../layout/ConfirmModal";

import "./Sidebar.css";

const Sidebar = ({
    boards,
    activeBoardId,
    setActiveBoardId,
    deleteBoard,
    setShowAddBoardForm,
    isOpen,
    setIsOpen,
    darkMode,
    toggleMode,
    loading,
}) => {
    // Estado para controle do modal de confirmação
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [boardToDelete, setBoardToDelete] = useState(null);

    // Função para mudar o board ativo
    const toggleBoard = (id) => {
        setActiveBoardId(id);
        setIsOpen(false);
    };

    // Função para abrir o modal de confirmação
    const handleDeleteClick = (id) => {
        setBoardToDelete(id);
        setShowConfirmModal(true);
    };

    // Função para confirmar a exclusão
    const confirmDelete = () => {
        if (boardToDelete) {
            deleteBoard(boardToDelete);
        }
        setShowConfirmModal(false);
        setBoardToDelete(null);
    };

    return (
        <>
            <aside className={isOpen ? "aside open" : "aside"}>
                <h1>
                    TaskManager
                    <button className="mode-btn" onClick={toggleMode}>
                        {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
                    </button>
                </h1>
                <span className="info">Todos painéis ({boards.length})</span>

                {loading && <span className="loading-msg">Carregando...</span>}

                <div className="boards">
                    {boards.map((board) => (
                        <div
                            key={board.id}
                            className={`board ${activeBoardId === board.id ? "active" : ""}`}
                            onClick={() => toggleBoard(board.id)}
                        >
                            <MdOutlineDashboard /> <span>{board.title}</span>
                            <button
                                className="delete-btn"
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita ativar o clique no board
                                    handleDeleteClick(board.id);
                                }}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}

                    <div className="board new-board" onClick={() => setShowAddBoardForm(true)}>
                        <MdOutlineDashboard /> <span>+Criar novo painel</span>
                    </div>
                </div>
            </aside>

            {showConfirmModal && (
                <ConfirmModal
                    title="Excluir Painel?"
                    description="Tem certeza de que deseja excluir este painel?"
                    btnText="Excluir"
                    onClick={confirmDelete}
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
