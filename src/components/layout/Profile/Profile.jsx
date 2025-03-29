import { FaXmark } from "react-icons/fa6";
import "./Profile.css";

const Profile = ({
    profileIsOpen,
    setProfileIsOpen,
    isLoadingProfile,
    user,
    handleLogout,
}) => {
    return (
        <div className={profileIsOpen ? "profile open-profile" : "profile"}>
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
    );
};

export default Profile;
