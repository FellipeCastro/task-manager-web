import { useState, useEffect } from "react";

import Header from "../layout/Header";
import MainBoard from "../layout/MainBoard";
import Sidebar from "../layout/Sidebar";
import AddBoardForm from "../layout/AddBoardForm";
import AddTaskForm from "../layout/AddTaskForm";
import TaskModal from "../layout/TaskModal";
import Loading from "../layout/Loading";

import api from "../../constants/api";

const Home = () => {
    const [boards, setBoards] = useState([]);
    const [activeBoardId, setActiveBoardId] = useState(null);
    const [showAddBoardForm, setShowAddBoardForm] = useState(false);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [loading, setLoading] = useState(true);
    const [isAddingBoard, setIsAddingBoard] = useState(false);
    const [isDeletingBoard, setIsDeletingBoard] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [isUpdatingTask, setIsUpdatingTask] = useState(false);
    const [isDeletingTask, setIsDeletingTask] = useState(false);
    const [error, setError] = useState(null);

    // Função central para tratamento de erros
    const handleApiError = (error, defaultMessage) => {
        const errorMessage = error.response?.data?.error || defaultMessage;
        setError(errorMessage);
        console.error(defaultMessage, error);
    };

    // Função central para atualizar dados
    const updateData = async () => {
        try {
            const response = await api.get("/boards/overview");
            const result = response.data;
            setBoards(result);
            if (activeBoardId == null && result.length > 0) {
                setActiveBoardId(result[0].id);
            }
            setLoading(false);
        } catch (error) {
            handleApiError(error, "Erro ao carregar dados.");
        }
    };

    const addBoard = async (title) => {
        try {
            setIsAddingBoard(true);
            const response = await api.post("/boards", { title });
            await updateData();
            setActiveBoardId(response.data.id_board);
            setIsOpen(false);
        } catch (error) {
            handleApiError(error, "Erro ao adicionar painel.");
        } finally {
            setIsAddingBoard(false);
        }
    };

    const deleteBoard = async (id) => {
        try {
            setIsDeletingBoard(true);
            await api.delete(`/boards/${id}`);
            await updateData();
            if (activeBoardId === id) {
                if (boards.length > 0) {
                    setActiveBoardId(boards[0].id);
                } else {
                    setActiveBoardId(null);
                }
            }
            setIsOpen(false);
        } catch (error) {
            handleApiError(error, "Erro ao deletar painel.");
        } finally {
            setIsDeletingBoard(false);
        }
    };

    const addTask = async (newTask) => {
        try {
            setIsAddingTask(true);
            await api.post(`/tasks/${activeBoardId}`, newTask);
            await updateData();
            setShowAddTaskForm(false);
        } catch (error) {
            handleApiError(error, "Erro ao adicionar tarefa.");
        } finally {
            setIsAddingTask(false);
        }
    };

    const updateTask = async (subtaskId, subtaskIsDone) => {
        try {
            setIsUpdatingTask(true);
            await api.put(`/subtasks/${subtaskId}`, {
                is_done: !subtaskIsDone,
            });
            await updateData();
            setShowTaskModal(false);
        } catch (error) {
            handleApiError(error, "Erro ao atualizar tarefa.");
        } finally {
            setIsUpdatingTask(false);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            setIsDeletingTask(true);
            await api.delete(`/tasks/${activeBoardId}/${taskId}`);
            await updateData();
            setShowTaskModal(false);
        } catch (error) {
            handleApiError(error, "Erro ao deletar tarefa.");
        } finally {
            setIsDeletingTask(false);
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowTaskModal(true);
    };

    const toggleMode = () => {
        setDarkMode(!darkMode);
        document.querySelector("html").classList.toggle("light-mode");
    };

    useEffect(() => {
        updateData();
    }, []);

    const activeBoard = boards.find((board) => board.id === activeBoardId);

    return (
        <>
            {isAddingBoard && <Loading />}
            {isDeletingBoard && <Loading />}
            {isAddingTask && <Loading />}
            {isUpdatingTask && <Loading />}
            {isDeletingTask && <Loading />}

            <div className={error ? "error-msg" : "error-msg hide"}>
                <span>{error}</span>
                <button onClick={() => setError(null)}>X</button>
            </div>
            <div className="container">
                <Sidebar
                    boards={boards}
                    activeBoardId={activeBoardId}
                    setActiveBoardId={setActiveBoardId}
                    deleteBoard={deleteBoard}
                    setShowAddBoardForm={setShowAddBoardForm}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    darkMode={darkMode}
                    toggleMode={toggleMode}
                    loading={loading}
                />
                <div className="main-container">
                    <Header
                        activeBoard={activeBoard}
                        setShowAddTaskForm={setShowAddTaskForm}
                        setIsOpen={setIsOpen}
                    />
                    <MainBoard
                        activeBoard={activeBoard}
                        handleTaskClick={handleTaskClick}
                        loading={loading}
                    />
                </div>
            </div>

            {showAddBoardForm && (
                <AddBoardForm
                    setShowAddBoardForm={setShowAddBoardForm}
                    addBoard={addBoard}
                />
            )}
            {showAddTaskForm && (
                <AddTaskForm
                    setShowAddTaskForm={setShowAddTaskForm}
                    addTask={addTask}
                    activeBoardId={activeBoardId}
                />
            )}
            {showTaskModal && (
                <TaskModal
                    task={selectedTask}
                    setShowTaskModal={setShowTaskModal}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            )}
        </>
    );
};

export default Home;
