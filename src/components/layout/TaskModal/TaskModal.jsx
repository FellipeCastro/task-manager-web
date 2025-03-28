import { useState } from "react";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import "./TaskModal.css";

const TaskModal = ({ task, setShowTaskModal, updateTask, deleteTask }) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    if (!task) return null;

    const countCompletedSubtasks = (subtasks) => {
        return subtasks.filter((subtask) => subtask.is_done).length;
    };

    const handleEdit = (subtaskId, subtaskIsDone) => {
        updateTask(subtaskId, subtaskIsDone);
    };

    const handleDelete = () => {
        setShowConfirmModal(true);
    };

    const confirmDelete = () => {
        deleteTask(task.id);
        setShowConfirmModal(false);
    };

    return (
        <>
            <div className="fade" onClick={() => setShowTaskModal(false)}></div>
            <div className="task-modal">
                <div className="title-container">
                    <h4>{task.title}</h4>
                    <button className="delete-task-btn" onClick={handleDelete}>
                        <FaTrashAlt />
                    </button>
                </div>
                <p>{task.description}</p>

                <h5>
                    Subtarefas ({countCompletedSubtasks(task.subtasks)} de{" "}
                    {task.subtasks.length})
                </h5>

                <div className="subtasks">
                    {task.subtasks.map((subtask) => (
                        <div
                            key={subtask.id}
                            className={`subtask ${
                                subtask.is_done ? "done" : ""
                            }`}
                        >
                            <button
                                className="subtask-btn"
                                onClick={() =>
                                    handleEdit(subtask.id, subtask.is_done)
                                }
                            >
                                {subtask.is_done ? <FaCheck /> : ""}
                            </button>
                            <span>{subtask.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {showConfirmModal && (
                <ConfirmModal
                    title="Excluir Tarefa"
                    description="Tem certeza de que deseja excluir esta tarefa?"
                    btnText="Excluir"
                    onClick={confirmDelete}
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}
        </>
    );
};

export default TaskModal;
