import React from "react";
import parse from "html-react-parser";

const InfoMain = (props) => {
  const { projectDetail } = props;
  return (
    <>
      <h3 className="mb-2">{projectDetail.projectName}</h3>
      <span>
        {projectDetail.description && parse(projectDetail.description)}
      </span>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {projectDetail.members?.map((user, index) => {
            return (
              <div className="avatar" key={index}>
                <img src={user.avatar} alt="true" />
              </div>
            );
          })}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
};

export default InfoMain;
