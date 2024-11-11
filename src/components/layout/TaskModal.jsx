import { FaCheck, FaTrashAlt } from "react-icons/fa"

import "./TaskModal.css"

const TaskModal = ({ task, setShowTaskModal, updateTask, deleteTask }) => {
    // Verifica se a taks existe
    if (!task) return null

    // Função que conta quantas subtarefas foram concluídas
    const countCompletedSubtasks = (subtasks) => {
        // Filtra as subtarefas e retorna apenas as concluídas
        return subtasks.filter((subtask) => subtask.is_done).length
    }

    const handleEdit = (subtaskId, subtaskIsDone) => {
        updateTask(subtaskId, subtaskIsDone)
    }

    return (
        <>
            <div className="fade" onClick={() => setShowTaskModal(false)}></div>
            <div className="task-modal">
                <div className="title-container">
                    <h4>{task.title}</h4>

                    <button className="delete-task-btn" onClick={() => deleteTask(task.id)}>
                        <FaTrashAlt />
                    </button>
                </div>
                <p>{task.description}</p>

                <h5>Subtarefas ({countCompletedSubtasks(task.subtasks)} de {task.subtasks.length})</h5>

                <div className="subtasks">
                    {task.subtasks.map((subtask) => {
                        return (
                            <div key={subtask.id} className={`subtask ${subtask.is_done ? "done" : ""}`}>
                                <button className="subtask-btn" onClick={() => handleEdit(subtask.id, subtask.is_done)}>
                                    {subtask.is_done ? <FaCheck /> : ""}
                                </button>
                                <span>{subtask.title}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default TaskModal
