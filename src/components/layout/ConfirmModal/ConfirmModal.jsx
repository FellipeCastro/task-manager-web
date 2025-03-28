import { IoIosWarning } from "react-icons/io";
import "./ConfirmModal.css";

const ConfirmModal = ({ title, description, btnText, onClick, onCancel }) => {
    return (
        <>
            <div className="fade-modal" onClick={onCancel}></div>
            <div className="confirm-modal">
                <div className="flex-modal">
                    <IoIosWarning />
                    <div>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="btns-container-modal">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="confirm-btn" onClick={onClick}>
                        {btnText}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ConfirmModal;
