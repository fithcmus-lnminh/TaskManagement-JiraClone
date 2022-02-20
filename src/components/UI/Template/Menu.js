import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const userInfo = useSelector((state) => state.userReducer.userLogin);

  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={userInfo.avatar} />
        </div>
        <div className="account-info">
          <p>{userInfo.name}</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <NavLink
            to="/board"
            style={{ color: "black" }}
            className={(navData) => (navData.isActive ? "active" : "")}
          >
            {" "}
            Main Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-plus" />
          <NavLink to="/create-project" style={{ color: "black" }}>
            {" "}
            Create Project
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink to="/project-management" style={{ color: "black" }}>
            {" "}
            Manage Project
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
