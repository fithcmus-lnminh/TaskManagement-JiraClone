import React from "react";
import Index from "../UI/Index";
import ContentMain from "../UI/Template/Main/ContentMain";
import HeaderMain from "../UI/Template/Main/HeaderMain";
import InfoMain from "../UI/Template/Main/InfoMain";

const Home = () => {
  return (
    <Index>
      <div className="main">
        <HeaderMain>Main Board</HeaderMain>
        <h3>Cyber Board</h3>
        <InfoMain />
        <ContentMain />
      </div>
    </Index>
  );
};

export default Home;
