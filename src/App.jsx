import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Diary from "./Diary/Diary";
// import GramCalc from "./Diary/GramCalc";
// import Login from "./Login/Login";
// import Register from "./Register/Registration";

function ProtectedRoute({ isAuth, children }) {
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

import Page from "./pages/Page";
const MainPageContent = lazy(() => import("./pages/MainPage/MainPage"));
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <Page>
              <MainPageContent />
            </Page>
          }
        />
        {/* Login & Register */}
        {/* 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        */}

        {/* Diary korumalı */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
