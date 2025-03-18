import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Componentes
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

const App = () => {
    const token = localStorage.getItem("authToken");

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/home"
                        element={token ? <Home /> : <Navigate to="/login" />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
