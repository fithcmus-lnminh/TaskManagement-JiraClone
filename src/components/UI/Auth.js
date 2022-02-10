import React from "react";
import { Form, Input, Button, Checkbox, Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const Auth = (props) => {
  return (
    <Layout>
      <Sider
        width={(window.innerWidth * 2) / 3}
        style={{
          height: window.innerHeight,
          backgroundImage: "url(https://picsum.photos/500)",
        }}
      ></Sider>
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default Auth;
