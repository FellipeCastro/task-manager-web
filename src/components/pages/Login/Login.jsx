import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import api from "../../../constants/api.js";
import Loading from "../../layout/Loading/Loading.jsx";
import "../../layout/AddBoardForm/Form.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleError = (error) => {
        const errorMessage = error.response?.data?.error;
        setError(errorMessage);
        console.error(error);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formatedEmail = email.toLocaleLowerCase().trim();

        try {
            const response = await api.post("/users/login", {
                email: formatedEmail,
                password,
            });
            const result = response.data;

            setError(null);
            localStorage.setItem("authToken", result.token);
            localStorage.setItem("idUser", result.id);
            navigate("/home");
        } catch (error) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("isUser");
            error.response?.data.error ? handleError(error) : null;
            console.error("Erro ao realizar login: ", error);
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
                <h2>Login</h2>

                <form
                    method="post"
                    autoComplete="off"
                    className="form"
                    onSubmit={handleLogin}
                >
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
                    <button type="submit" className="submit-btn">
                        Login
                    </button>
                    <span className="bottom-link">
                        Não tem uma conta?{" "}
                        <Link to="/register">Cadastre-se já</Link>
                    </span>
                </form>
            </div>
        </>
    );
};

export default Login;
