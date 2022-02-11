import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const userInfo = useSelector((state) => state.userReducer.userLogin);
  return (
    <div className="mt-3 ml-3">
      <h3>Name: {userInfo.name}</h3>
      <h3>Email: {userInfo.email}</h3>
      <h3>ID: {userInfo.id}</h3>
      <h3>SĐT: {userInfo.phoneNumber}</h3>
      <h3>
        Avatar: <img src={userInfo.avatar} alt="..." />
      </h3>
    </div>
  );
};

export default Home;
