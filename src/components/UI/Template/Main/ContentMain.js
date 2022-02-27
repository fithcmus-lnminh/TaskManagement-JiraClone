import React from "react";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GET_TASK_DETAIL_SAGA } from "../../../../redux/consts/taskManagement/index";

const ContentMain = (props) => {
  const { projectDetail } = props;
  console.log(projectDetail);

  const dispatch = useDispatch();

  const renderCardTaskList = () => {
    return projectDetail.lstTask?.map((taskList, index) => {
      return (
        <div
          key={index}
          className="card"
          style={{ width: "30%", height: "auto" }}
        >
          <div className="card-header">{taskList.statusName}</div>
          <ul className="list-group list-group-flush">
            {taskList.lstTaskDeTail.map((task, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item"
                  data-bs-toggle="modal"
                  data-bs-target="#infoModal"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch({
                      type: GET_TASK_DETAIL_SAGA,
                      taskId: task.taskId,
                    });
                  }}
                >
                  <h6>{task.taskName}</h6>
                  <div className="block d-flex align-items-end">
                    {task.priorityTask.priority === "High" ? (
                      <div
                        className="block-left text-danger"
                        style={{ height: "2.25rem" }}
                      >
                        <i className="fa fa-arrow-up"></i>
                      </div>
                    ) : (
                      ""
                    )}
                    {task.priorityTask.priority === "Medium" ? (
                      <div
                        className="block-left text-warning"
                        style={{ height: "2.25rem" }}
                      >
                        <i className="fa fa-arrow-up"></i>
                      </div>
                    ) : (
                      ""
                    )}
                    {task.priorityTask.priority === "Low" ||
                    task.priorityTask.priority === "Lowest" ? (
                      <div
                        className="block-left text-success"
                        style={{ height: "2.25rem" }}
                      >
                        <i className="fa fa-arrow-down"></i>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        <div className="avatar">
                          {task.assigness.slice(0, 3).map((mem, index) => {
                            return (
                              <img
                                src={mem.avatar}
                                alt="true"
                                style={{ width: "34.5px", height: "34.5px" }}
                              />
                            );
                          })}
                          {task.assigness.length > 3 ? (
                            <Avatar
                              style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                              }}
                            >
                              +{task.assigness.length - 3}
                            </Avatar>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
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
