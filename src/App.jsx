import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Diary from "./Diary/Diary";
import GramCalc from "./Diary/GramCalc";
import Login from "./Login/Login";
import Register from "./Register/Registration";


function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

 
import MainPage from "./MainPage/MainPage"; 

export default function App() {
  const [view, setView] = useState("main"); 
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dailyRate, setDailyRate] = useState(2800);

  // ---- Auth ----
  const handleLogin = async ({ email, password }) => {
    // backend 
    setIsAuth(true);
    navigate("/diary", { replace: true });
  };

  const handleRegister = async ({ name, email, password }) => {
    // signup
    setIsAuth(true);
    navigate("/diary", { replace: true });
  };

  const handleLogout = () => {
    setIsAuth(false);
    navigate("/login", { replace: true });
  };

  // ---- Diary/GramCalc ----
  const handleAdd = (item) => {
    setProducts((prev) => [...prev, item]);
    navigate("/diary"); 
  };

  const handleDelete = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };
  const handleOpenAdd = () => navigate("/add");
  const handleBackToDiary = () => navigate("/diary");
  const handleExit = () => navigate("/diary");
  const handleMenuClick = () => console.log("menu");

  return (
    <Routes>
      {/* Login & Register */}
      <Route
        path="/login"
        element={
          <Login
            onSubmit={handleLogin}
            onSwitchTab={(tab) =>
              tab === "register" ? navigate("/register") : null
            }
          />
        }
      />
      <Route
        path="/register"
        element={
          <Register
            onSubmit={handleRegister}
            onSwitchTab={(tab) => (tab === "login" ? navigate("/login") : null)}
          />
        }
      />

      {/* Diary korumalı */}
      <Route
        path="/diary"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Diary
              products={products}
              date={date}
              dailyRate={dailyRate}
              onBack={handleBackToDiary}
              onExit={handleLogout}
              onMenuClick={handleMenuClick}
              onAddClick={handleOpenAdd} 
              onAdd={handleAdd} 
              onDelete={handleDelete}
              onDateChange={setDate}
            />
          </ProtectedRoute>
        }
      />

      {/* GramCalc (modal sayfası) korumalı */}
      <Route
        path="/add"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <GramCalc
              title="Nic"
              onMenuClick={handleMenuClick}
              onBack={handleBackToDiary}
              onExit={handleExit}
              onAdd={handleAdd}
              pending={false}
            />
          </ProtectedRoute>
        }
      />

      {/* Kök ve 404 yönlendirmeleri */}
      <Route
        path="/"
        element={<Navigate to={isAuth ? "/diary" : "/login"} replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
  