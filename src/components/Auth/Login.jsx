import React from "react";
import { Input, Button, Layout } from "antd";
import Auth from "../UI/Auth";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

const Login = () => {
  return (
    <Auth>
      <form className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: window.innerHeight }}
        >
          <div className="w-75">
            <h3 className="text-center mb-3">Login</h3>
            <Input
              size="large"
              placeholder="Email"
              prefix={<UserOutlined />}
              className="mb-3"
            />
            <Input
              type="password"
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
            />
          </div>
          <Button
            size="middle"
            className="mt-4 w-75"
            style={{ backgroundColor: "rgb(102,117,223)", color: "#fff" }}
          >
            Login
          </Button>

          <h6 className="mt-3 mb-0">or login with</h6>

          <div className="d-flex mt-3">
            <div className="social mr-2">
              <Button
                type="primary"
                shape="circle"
                icon={<FacebookOutlined />}
                style={{ backgroundColor: "rgb(59,89,152)" }}
              />
            </div>
            <div className="social">
              <Button
                type="primary"
                shape="circle"
                icon={<TwitterOutlined />}
              />
            </div>
          </div>
        </div>
      </form>
    </Auth>
  );
};

export default Login;
