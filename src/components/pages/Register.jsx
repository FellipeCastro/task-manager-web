import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../constants/api.js";

import Loading from "../layout/Loading.jsx";
import "../layout/Form.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("As senhas não conferem", { position: "top-right" });
            return;
        }

        const formatedEmail = email.toLocaleLowerCase().trim();

        try {
            const response = await api.post("/users/register", {
                name,
                email: formatedEmail,
                password,
            });
            const result = response.data;

            if (!result) {
                toast.error("Erro ao registrar usuário", {
                    position: "top-right",
                });
                return;
            }

            localStorage.setItem("authToken", result.token);
            navigate("/home");
        } catch (error) {
            error.response?.data.error
                ? toast.error("Erro ao realizar cadastro", {
                      position: "top-right",
                  })
                : null;
            console.error("Erro ao realizar cadastro: ", error);
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            <ToastContainer />
            <div className="container-form">
                <h2>Novo usuário</h2>

                <form
                    method="post"
                    autoComplete="off"
                    className="form"
                    onSubmit={handleRegister}
                >
                    <div className="input-container">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Digite seu nome aqui"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Digite seu email aqui"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Digite sua senha aqui"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="confirm-password">
                            Confirmar senha
                        </label>
                        <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            placeholder="Confirme sua senha aqui"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Cadastrar
                    </button>
                    <span className="bottom-link">
                        Já tem uma conta?{" "}
                        <Link to="/login">Faça seu login já</Link>
                    </span>
                </form>
            </div>
        </>
    );
};

export default Register;
