import "./MainBoard.css"

const MainBoard = ({ activeBoard, handleTaskClick, loading }) => {
    if (loading) {
        return <div className="main-board"><h3>Carregando...</h3></div>
    }
    
    // Verificande se nenhum board esta ativo
    if (!activeBoard) {
        return <div className="main-board"><h3>Selecione um painel</h3></div>
    }

    // Contando as subtasks completas
    const countCompletedSubtasks = (subtasks) => {
        // filtrando as subtasks em que isDone é verdadeiro
        return subtasks.filter((subtask) => subtask.is_done).length
    }

    // Definindo tarefas em que nenhuma subtask esta completa como 'afazer'
    const todoTasks = activeBoard.tasks.filter((task) => countCompletedSubtasks(task.subtasks) === 0)
    // Definindo tarefas em que as tarefas completas são maior que 0 e menos que o total de subtasks como 'fazendo'
    const doingTasks = activeBoard.tasks.filter((task) => {
        const completed = countCompletedSubtasks(task.subtasks)
        return completed > 0 && completed < task.subtasks.length
    })
    // Definindo tarefas em que todas subtasks estão completas como 'feitas'
    const doneTasks = activeBoard.tasks.filter((task) => countCompletedSubtasks(task.subtasks) === task.subtasks.length)

    return (
        <div className="main-board">
            <div className="column">
                <div className="title">
                    <span className="to-do"></span> <h3>Afazer ({todoTasks.length})</h3>
                </div>

                {todoTasks.map((task) => {
                    return (
                        <div key={task.id} className="task" onClick={() => handleTaskClick(task)}>
                            <h4>{task.title}</h4>
                            <span>{countCompletedSubtasks(task.subtasks)} de {task.subtasks.length} subtarefas</span>
                        </div>
                    )
                })}
                {todoTasks.length === 0 && <p className="msg">Não há tarefas a serem feitas</p>}
            </div>
            <div className="column">
                <div className="title">
                    <span className="doing"></span> <h3>Fazendo ({doingTasks.length})</h3>
                </div>

                {doingTasks.map((task) => {
                    return (
                        <div key={task.id} className="task" onClick={() => handleTaskClick(task)}>
                            <h4>{task.title}</h4>
                            <span>{countCompletedSubtasks(task.subtasks)} de {task.subtasks.length} subtarefas</span>
                        </div>
                    )
                })}
                {doingTasks.length === 0 && <p className="msg">Não há tarefas sendo feitas</p>}
            </div>
            <div className="column">
                <div className="title">
                    <span className="done"></span> <h3>Feito ({doneTasks.length})</h3>
                </div>

                {doneTasks.map((task) => {
                    return (
                        <div key={task.id} className="task" onClick={() => handleTaskClick(task)}>
                            <h4>{task.title}</h4>
                            <span>{countCompletedSubtasks(task.subtasks)} de {task.subtasks.length} subtarefas</span>
                        </div>
                    )
                })}
                {doneTasks.length === 0 && <p className="msg">Não há tarefas feitas</p>}
            </div>
        </div>
    )
}
  
export default MainBoard
  