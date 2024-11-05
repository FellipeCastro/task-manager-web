import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import api from "../../constants/api"

import "../layout/Form.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/users/login", {
        email,
        password
      })
      const result = response.data

      localStorage.setItem("authToken", result.token)
      navigate("/home")
    } catch (error) {
      console.error("Erro ao realizar login: ", error)
      alert("Erro ao realizar login")
    }
  }

  return (
    <div className="container-form">
      <h2>Login</h2>

      <form method="post" autoComplete="off" className="form" onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" placeholder="Digite seu email aqui" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" placeholder="Digite sua senha aqui" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="submit-btn">Login</button>
        <span className="bottom-link">Não tem uma conta? <Link to="/register">Cadastre-se já</Link></span>
      </form>
    </div>
  )
}

export default Login
