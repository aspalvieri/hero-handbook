import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./providers/AuthProvider";
import AuthRoute from "./utils/AuthRoute";

import Home from "./components/dashboard/Home";
import Test from "./components/dashboard/Test";
import Test2 from "./components/dashboard/Test2";
import Logout from "./components/authentication/Logout";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route element={<AuthRoute />}>
            <Route path="/test2" element={<Test2 />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
