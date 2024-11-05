import { useState, useEffect } from "react"

// Componentes
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

  const fetchData = async () => {
    const response = await api.get("/boards/overview")
    const result = await response.data

    if (result) {
      setBoards(result)
      
       if (activeBoardId == null) {
        setActiveBoardId(result[0].id)
       }
    }
  }

  const deleteBoard = async (id) => {
    const response = await api.delete(`/boards/${id}`)
    const result = await response.data

    if (result) {
      fetchData()
    }

    // Se o board ativo for deletado, resetamos o activeBoardId
    if (activeBoardId === id) {
      setActiveBoardId(null)
    }

    setIsOpen(false)
  }

  const addBoard = async (title) => {
    const response = await api.post("/boards", {
      title
    })
    const result = await response.data

    if (result) {
      fetchData()
      setIsOpen(false)
    }
  }

  // Definindo board ativo com base no activeBoardId
  const activeBoard = boards.find((board) => board.id === activeBoardId)

  // Função para mostrar o modal da tarefa clicada
  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  const updateTask = async (subtaskId, subtaskIsDone) => {
    const response = await api.put(`/subtasks/${subtaskId}`, {
      is_done: !subtaskIsDone
    })

    const result = response.data

    if (result) {
      fetchData()
      setShowTaskModal(false)
    }
  }

  const deleteTask = async (taskId) => {
    const response = await api.delete(`/tasks/${activeBoardId}/${taskId}`)
    const result = await response.data

    if (result) {
      fetchData()
      setShowTaskModal(false)
    }
  }


  const addTask = async (newTask) => {
    const response = await api.post(`/tasks/${activeBoardId}`, newTask)
    const result = await response.data

    if (result) {
      fetchData() // Recarrega os dados após adicionar a tarefa
      setShowAddTaskForm(false) // Fecha o formulário
    }
  }


  const toggleMode = () => {
    setDarkMode(!darkMode)
    const html = document.querySelector("html")
    html.classList.toggle("light-mode")
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
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
          <MainBoard
            activeBoard={activeBoard}
            handleTaskClick={handleTaskClick}
          />
        </div>
      </div>

      <Footer />

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
  )
}

export default Home
