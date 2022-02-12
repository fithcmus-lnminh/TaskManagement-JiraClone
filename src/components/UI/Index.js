import React from "react";
import Menu from "./Template/Menu";
import Sidebar from "./Template/Sidebar";

const Index = (props) => {
  return (
    <div className="jira">
      <Sidebar />
      <Menu />
      {props.children}
    </div>
  );
};

export default Index;
