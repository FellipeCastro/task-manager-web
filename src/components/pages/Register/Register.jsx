import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import api from "../../../constants/api.js";
import Loading from "../../layout/Loading/Loading.jsx";
import "../../layout/AddBoardForm/Form.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleError = (error) => {
        const errorMessage = error.response?.data?.error;
        setError(errorMessage);
        console.error(error);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            setError("As senhas não conferem");
            setLoading(false);
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

            setError(null);
            localStorage.setItem("authToken", result.token);
            localStorage.setItem("idUser", result.id_user);
            navigate("/home");
        } catch (error) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("idUser");
            error.response?.data.error ? handleError(error) : null;
            console.error("Erro ao realizar cadastro: ", error);
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            <div className={error ? "error-msg" : "error-msg hide"}>
                <span>{error}</span>
                <button onClick={() => setError(null)}>
                    <IoMdClose />
                </button>
            </div>
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
                            type="email"
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
