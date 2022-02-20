import React from "react";

const HeaderMain = (props) => {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Projects</li>
          <li className="breadcrumb-item">singularity 1.0</li>
          <li className="breadcrumb-item active" aria-current="page">
            {props.children}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default HeaderMain;
