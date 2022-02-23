import React from "react";

const ContentMain = (props) => {
  const { projectDetail } = props;
  console.log(projectDetail);

  const renderCardTaskList = () => {
    return projectDetail.lstTask?.map((task, index) => {
      return (
        <div
          key={index}
          className="card"
          style={{ width: "17rem", height: "25rem" }}
        >
          <div className="card-header">{task.statusName}</div>
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item"
              data-toggle="modal"
              data-target="#infoModal"
              style={{ cursor: "pointer" }}
            >
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-bookmark" />
                  <i className="fa fa-arrow-up" />
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    <div className="avatar">
                      <img
                        src={require("../../../../assets/img/download (1).jfif")}
                        alt="true"
                      />
                    </div>
                    <div className="avatar">
                      <img
                        src={require("../../../../assets/img/download (2).jfif")}
                        alt="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <p>
                Each issue has a single reporter but can have multiple assignees
              </p>
              <div className="block" style={{ display: "flex" }}>
                <div className="block-left">
                  <i className="fa fa-check-square" />
                  <i className="fa fa-arrow-up" />
                </div>
                <div className="block-right">
                  <div className="avatar-group" style={{ display: "flex" }}>
                    <div className="avatar">
                      <img
                        src={require("../../../../assets/img/download (1).jfif")}
                        alt="true"
                      />
                    </div>
                    <div className="avatar">
                      <img
                        src={require("../../../../assets/img/download (2).jfif")}
                        alt="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderCardTaskList()}
    </div>
  );
};

export default ContentMain;
