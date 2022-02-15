import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "antd/dist/antd.min.css";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import { useDispatch } from "react-redux";
import CreateProject from "./components/Jira/CreateProject";
import ProjectManagement from "./components/Jira/ProjectManagement";
import Drawer from "./components/UI/Shared/Drawer";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ADD_NAVIGATE", navigate: navigate });
  }, []);

  return (
    <>
      <Drawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project-management" element={<ProjectManagement />} />
      </Routes>
    </>
  );
}

export default App;
