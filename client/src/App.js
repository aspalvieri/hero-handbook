import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Authentication Components
import AuthProvider from "./providers/AuthProvider";
import AuthRoute from "./utils/AuthRoute";

//Website Components
import Home from "./components/dashboard/Home";
import Test from "./components/dashboard/Test";
import Test2 from "./components/dashboard/Test2";
import Logout from "./components/authentication/Logout";

//Partial Components
import Navbar from "./components/partials/Navbar";
import NotFound from "./components/partials/NotFound";
import Footer from "./components/partials/Footer";

//CSS Styles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
    <div className="h-screen flex flex-col">
      <AuthProvider>
          <Navbar />
          <div className="lg:container lg:mx-auto bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route element={<AuthRoute />}>
                <Route path="/test2" element={<Test2 />} />
                <Route path="/logout" element={<Logout />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        
      </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
