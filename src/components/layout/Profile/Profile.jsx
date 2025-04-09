import { useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import "./Profile.css";

const Profile = ({
    profileIsOpen,
    setProfileIsOpen,
    isLoadingProfile,
    user,
    handleLogout,
}) => {
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileIsOpen(false);
            }
        };

        if (profileIsOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileIsOpen, setProfileIsOpen]);

    return (
        <div
            ref={profileRef}
            className={profileIsOpen ? "profile open-profile" : "profile"}
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
    );
};

export default Profile;
