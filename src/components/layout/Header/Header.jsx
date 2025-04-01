import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import "./Header.css";
import Profile from "../Profile/Profile.jsx";

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
        localStorage.removeItem("idUser");
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

                <Profile
                    profileIsOpen={profileIsOpen}
                    setProfileIsOpen={setProfileIsOpen}
                    isLoadingProfile={isLoadingProfile}
                    user={user}
                    handleLogout={handleLogout}
                />
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
