import { MdOutlineDashboard } from "react-icons/md"
import { FaTrashAlt } from "react-icons/fa"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"

import "./Sidebar.css";

const Sidebar = ({ boards, activeBoardId, setActiveBoardId, deleteBoard, setShowAddBoardForm, isOpen, setIsOpen, darkMode, toggleMode }) => {
    // Função para mudar o board ativo
    const toggleBoard = (id) => {
        setActiveBoardId(id)
        setIsOpen(false)
    }

    return (
        <aside className={isOpen ? "aside open" : "aside"}>
            <h1>TaskManager <button className="mode-btn" onClick={toggleMode}>{darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}</button></h1>
            <span className="info">Todos painéis ({boards.length})</span>

            <div className="boards">
                {boards.map((board) => {
                    return (
                        <div key={board.id} className={`board ${activeBoardId === board.id ? 'active' : ''}`} onClick={() => toggleBoard(board.id)}>
                            <MdOutlineDashboard /> <span>{board.title}</span>

                            <button className="delete-btn" onClick={() => {deleteBoard(board.id)}}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    );
                })}

                <div className="board new-board" onClick={() => setShowAddBoardForm(true)}>
                    <MdOutlineDashboard /> <span>+Criar novo painel</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
