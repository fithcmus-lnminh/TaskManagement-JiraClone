import React, { useState, useEffect } from "react";
import { Layout } from "antd";

const { Sider, Content } = Layout;

const Auth = (props) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
  });

  return (
    <Layout>
      <Sider
        width={(size.width * 2) / 3}
        style={{
          height: size.height,
          backgroundImage: `url(https://picsum.photos/1000)`,
          backgroundSize: "100%",
        }}
      >
        <p
          style={{
            backgroundColor: "black",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Because WebAPI using HTTP method, please allow insecure content
          for this website to register, login and get data. Thank you!
        </p>
      </Sider>
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default Auth;
