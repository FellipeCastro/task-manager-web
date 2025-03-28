import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser, FaXmark } from "react-icons/fa6";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import "./Header.css";

const Header = ({
    activeBoard,
    setShowAddTaskForm,
    setIsOpen,
    user,
    isLoadingProfile,
}) => {
    const [profileIsOpen, setProfileIsOpen] = useState(false);
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        setShowConfirmLogout(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isUser");
        navigate("/login");
    };

    const handleAddTask = () => {
        if (!activeBoard) return;
        setShowAddTaskForm(true);
    };

    return (
        <>
            <header className="header">
                <h2 onClick={() => setIsOpen(true)}>
                    <span>
                        <IoIosArrowDown />
                    </span>
                    {activeBoard
                        ? activeBoard.title
                        : "Nenhum painel selecionado"}
                </h2>

                <div className="btns-container">
                    <button className="btn" onClick={handleAddTask}>
                        +Nova tarefa
                    </button>
                    <button
                        className="profile-btn"
                        onClick={() => setProfileIsOpen(!profileIsOpen)}
                    >
                        <FaUser />
                    </button>
                </div>

                <div
                    className={
                        profileIsOpen ? "profile open-profile" : "profile"
                    }
                >
                    <button
                        className="close-btn"
                        onClick={() => setProfileIsOpen(false)}
                    >
                        <FaXmark />
                    </button>
                    <h3>Perfil</h3>
                    <strong>Nome: </strong>
                    <p>{isLoadingProfile ? "Carregando..." : user.name}</p>
                    <hr />
                    <strong>Email: </strong>
                    <p>{isLoadingProfile ? "Carregando..." : user.email}</p>
                    <hr />
                    <button className="btn logout-btn" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </header>

            {showConfirmLogout && (
                <ConfirmModal
                    title="Confirmar Logout"
                    description="Tem certeza de que deseja sair da sua conta?"
                    btnText="Sair"
                    onClick={confirmLogout}
                    onCancel={() => setShowConfirmLogout(false)}
                />
            )}
        </>
    );
};

export default Header;
