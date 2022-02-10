import React from "react";
import { Layout } from "antd";

const { Sider, Content } = Layout;

const Auth = (props) => {
  return (
    <Layout>
      <Sider
        width={(window.innerWidth * 2) / 3}
        style={{
          height: window.innerHeight,
          backgroundImage: "url(https://picsum.photos/1000)",
          backgroundSize: "100%",
        }}
      ></Sider>
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default Auth;
