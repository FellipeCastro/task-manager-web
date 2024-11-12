import { useNavigate } from "react-router-dom"
import { IoIosArrowDown } from "react-icons/io"
import { MdLogout } from "react-icons/md"

import "./Header.css"

const Header = ({ activeBoard, setShowAddTaskForm, setIsOpen }) => {
    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate("/login")
    }
    
    return (
        <header className="header">
            <h2 onClick={() => setIsOpen(true)}><span><IoIosArrowDown /></span>{activeBoard ? activeBoard.title : "Nenhum painel selecionado"}</h2>

            <div className="btns-container">
                <button className="btn" onClick={() => setShowAddTaskForm(true)}>+Nova tarefa</button>
                <button className="logout-btn" onClick={handleLogout}>
                    <MdLogout />
                </button>
            </div>
        </header>
    )
}
  
export default Header
  