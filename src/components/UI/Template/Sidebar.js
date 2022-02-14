import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarsOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const [state, setState] = useState({
    collapsed: true,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "100%" }}
      >
        <div
          className="text-center text-white mt-2"
          onClick={toggle}
          style={{ cursor: "pointer", fontSize: 20 }}
        >
          <BarsOutlined />
        </div>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={{}}>
          <Menu.Item key="1" icon={<PlusOutlined />}>
            CREATE ISSUES
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />}>
            SEARCH
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;

// return (
//   <div className="sideBar">
//     <div className="sideBar-top">
//       <div className="sideBar-icon">
//         <i className="fab fa-jira" />
//       </div>
//       <div
//         className="sideBar-icon mb-3"
//         data-toggle="modal"
//         data-target="#searchModal"
//         style={{ cursor: "pointer" }}
//       >
//         <i className="fa fa-search" />
//         <span className="title">SEARCH ISSUES</span>
//       </div>
//       <div className="sideBar-icon">
//         <i className="fa fa-plus" />
//         <span className="title">CREATE ISSUES</span>
//       </div>
//     </div>
//     <div className="sideBar-bottom">
//       <div className="sideBar-icon">
//         <i className="fa fa-question-circle" />
//         <span className="title">ABOUT</span>
//       </div>
//     </div>
//   </div>
// );
