import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import { history } from "./utils/history";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
