import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Diary from "./Diary/Diary";
// import GramCalc from "./Diary/GramCalc";
// import Register from "./Register/Registration";

import Page from "./pages/Page";
const PublicCalculator = lazy(() =>
  import("./pages/PublicCalculator/PublicCalculator")
);
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <Page>
              <PublicCalculator />
            </Page>
          }
        />
        {/* Login & Register */}
        <Route
          path="/login"
          element={
            <Page>
              <Login />
            </Page>
          }
        />
        <Route
          path="/register"
          element={
            <Page>
              <Register />
            </Page>
          }
        />
        {/*
         */}

        {/* Diary korumalı */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
