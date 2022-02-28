import { LogoutOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LOGGED_OUT } from "../../../redux/consts/taskManagement";
import { TOKEN, USER_LOGIN } from "../../../utils/settingSystem";

const Menu = () => {
  const userInfo = useSelector((state) => state.userReducer.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        {/* <div>
          <i className="fa fa-credit-card" />
          <NavLink
            to="/board"
            style={{ color: "black" }}
            className={(navData) => (navData.isActive ? "active" : "")}
          >
            {" "}
            Main Board
          </NavLink>
        </div> */}
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
        <div
          className="d-flex align-items-center"
          style={{ position: "absolute", bottom: 0, left: "5rem" }}
          onClick={() => {
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER_LOGIN);
            dispatch({ type: LOGGED_OUT });
            navigate("/login");
          }}
        >
          <LogoutOutlined />
          <h6 className="ms-2 mb-0"> Logout</h6>
        </div>
      </div>
    </div>
  );
};

export default Menu;
