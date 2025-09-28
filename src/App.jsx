import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Diary from "./Diary/Diary";
import GramCalc from "./Diary/GramCalc";
import Login from "./Login/Login";
import Register from "./Register/Registration";
import Modal from "./Modal";

function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [date] = useState(new Date());
  const [dailyRate] = useState(2800);
  const [showModal, setShowModal] = useState(true);

  // ---- Auth ----
  // eslint-disable-next-line no-unused-vars
  const handleLogin = async ({ email, password }) => {
    // backend
    setIsAuth(true);
    navigate("/diary", { replace: true });
  };

  // eslint-disable-next-line no-unused-vars
  const handleRegister = async ({ name, email, password }) => {
    // signup
    setIsAuth(true);
    navigate("/diary", { replace: true });
  };

  // eslint-disable-next-line no-unused-vars
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

  const handleBack = () => navigate("/diary");
  const handleExit = () => navigate("/login");
  const handleMenuClick = () => {
    console.log("menu");
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route
          path="/diary"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Diary
                products={products}
                date={date}
                dailyRate={dailyRate}
                onBack={handleBack}
                onExit={handleExit}
                onMenuClick={handleMenuClick}
                onAdd={handleAdd}
                onDelete={handleDelete}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuth ? "/diary" : "/login"} replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <p>Modal çalışıyor</p>
      </Modal>
    </>
  );
}
  