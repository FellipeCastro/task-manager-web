import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Header from "../layout/Header"
import MainBoard from "../layout/MainBoard"
import Sidebar from "../layout/Sidebar"
import AddBoardForm from "../layout/AddBoardForm"
import AddTaskForm from "../layout/AddTaskForm"
import TaskModal from "../layout/TaskModal"
import Footer from "../layout/Footer"

import api from "../../constants/api"

const Home = () => {
  const [boards, setBoards] = useState([])
  const [activeBoardId, setActiveBoardId] = useState(null)
  const [showAddBoardForm, setShowAddBoardForm] = useState(false)
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [loading, setLoading] = useState(true)

  // Função central para tratamento de erros
  const handleApiError = (error, defaultMessage) => {
    const errorMessage = error.response?.data?.error || defaultMessage
    toast.error(errorMessage, { position: "top-right" })
    console.error(defaultMessage, error)
  }

  // Função central para atualizar dados
  const updateData = async () => {
    try {
      const response = await api.get("/boards/overview")
      const result = response.data
      setBoards(result)
      if (activeBoardId == null && result.length > 0) {
        setActiveBoardId(result[0].id)
      }
      setLoading(false)
    } catch (error) {
      handleApiError(error, "Erro ao carregar dados.")
    }
  }

  const addBoard = async (title) => {
    try {
      const response = await api.post("/boards", { title })
      await updateData()
      setActiveBoardId(response.data.id_board)
      setIsOpen(false)
    } catch (error) {
      handleApiError(error, "Erro ao adicionar painel.")
    }
  }

  const deleteBoard = async (id) => {
    try {
      await api.delete(`/boards/${id}`)
      await updateData()  // Aguarda a atualização dos dados para refletir a exclusão

      // Verifica se o board ativo foi deletado
      if (activeBoardId === id) {
        // Se há boards disponíveis após a exclusão, define o primeiro como ativo
        if (boards.length > 0) {
          setActiveBoardId(boards[0].id)
        } else {
          // Se não há mais boards, define o activeBoardId como null
          setActiveBoardId(null)
        }
      }
      setIsOpen(false)
    } catch (error) {
      handleApiError(error, "Erro ao deletar painel.")
    }
  }


  const addTask = async (newTask) => {
    try {
      await api.post(`/tasks/${activeBoardId}`, newTask)
      await updateData()
      setShowAddTaskForm(false)
    } catch (error) {
      handleApiError(error, "Erro ao adicionar tarefa.")
    }
  }

  const updateTask = async (subtaskId, subtaskIsDone) => {
    try {
      await api.put(`/subtasks/${subtaskId}`, { is_done: !subtaskIsDone })
      await updateData()
      setShowTaskModal(false)
    } catch (error) {
      handleApiError(error, "Erro ao atualizar tarefa.")
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${activeBoardId}/${taskId}`)
      await updateData()
      setShowTaskModal(false)
    } catch (error) {
      handleApiError(error, "Erro ao deletar tarefa.")
    }
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  const toggleMode = () => {
    setDarkMode(!darkMode)
    document.querySelector("html").classList.toggle("light-mode")
  }

  useEffect(() => {
    updateData()
  }, [])

  const activeBoard = boards.find((board) => board.id === activeBoardId)

  return (
    <>
      <ToastContainer />
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
        />
        <div className="main-container">
          <Header
            activeBoard={activeBoard}
            setShowAddTaskForm={setShowAddTaskForm}
            setIsOpen={setIsOpen}
          />
          <MainBoard activeBoard={activeBoard} handleTaskClick={handleTaskClick} loading={loading} />
        </div>
      </div>

      <Footer />

      {showAddBoardForm && (
        <AddBoardForm setShowAddBoardForm={setShowAddBoardForm} addBoard={addBoard} />
      )}
      {showAddTaskForm && (
        <AddTaskForm setShowAddTaskForm={setShowAddTaskForm} addTask={addTask} activeBoardId={activeBoardId} />
      )}
      {showTaskModal && (
        <TaskModal task={selectedTask} setShowTaskModal={setShowTaskModal} updateTask={updateTask} deleteTask={deleteTask} />
      )}
    </>
  )
}

export default Home
