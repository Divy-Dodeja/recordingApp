import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterLogin from "./pages/RegisterLogin";
import axios from "axios";
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registerLogin" element={<RegisterLogin />} />
      </Routes>
    </>
  );
}

export default App;
