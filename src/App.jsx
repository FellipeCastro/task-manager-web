import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home/Home.jsx";
import Login from "./components/pages/Login/Login.jsx";
import Register from "./components/pages/Register/Register.jsx";

// Componente de rota protegida
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("authToken");
    return token ? children : <Navigate to="/login" replace />;
};

// Componente de rota para visitantes
const GuestRoute = ({ children }) => {
    const token = localStorage.getItem("authToken");
    return token ? <Navigate to="/home" replace /> : children;
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate
                            to={
                                localStorage.getItem("authToken")
                                    ? "/home"
                                    : "/login"
                            }
                            replace
                        />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <Login />
                        </GuestRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <GuestRoute>
                            <Register />
                        </GuestRoute>
                    }
                />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
