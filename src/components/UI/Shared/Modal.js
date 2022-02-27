import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import {
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASKTYPE_SAGA,
} from "../../../redux/consts/taskManagement";
import {
  CHANGE_ASSIGNESS,
  CHANGE_MODAL,
  REMOVE_ASSIGNEE,
} from "../../../redux/consts/taskManagement/task";
import { Editor } from "@tinymce/tinymce-react";
import { CloseOutlined } from "@ant-design/icons";

const Modal = () => {
  const { allStatus, allPriority, allTaskType } = useSelector(
    (state) => state.ProjectReducer
  );
  const editorRef = useRef(null);

  const dispatch = useDispatch();
  const { taskDetailModal } = useSelector((state) => state.taskReducer);
  const projectDetail = useSelector(
    (state) => state.ProjectReducer.projectDetail
  );

  const [visibleEditor, setVisibleEditor] = useState(false);

  const handleChange = (e) => {
    dispatch({
      type: CHANGE_MODAL,
      name: e.target.name,
      value: e.target.value,
    });
  };
  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASKTYPE_SAGA });
  }, []);

  return (
    <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark me-2" />

              <select name="typeId" onChange={handleChange}>
                {allTaskType.map((type, index) => {
                  return (
                    <option key={index} value={type.id}>
                      {type.taskType}
                    </option>
                  );
                })}
              </select>
              <span style={{ fontSize: "1.5rem" }}>
                {taskDetailModal.taskName}
              </span>
            </div>
            <div className="task-click d-flex align-items-c">
              <div>
                <i className="fab fa-telegram-plane me-2" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link me-2" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
              <button
                type="button"
                className="close btn pt-0 ms-4"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <CloseOutlined />
                </span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-7">
                  <p className="issue">
                    This is an issue of type:{" "}
                    {taskDetailModal.taskTypeDetail.taskType}
                  </p>
                  <div className="description">
                    <p style={{ fontWeight: "bold" }}>Description</p>
                    {!visibleEditor ? (
                      <span
                        onClick={() => {
                          setVisibleEditor(true);
                        }}
                      >
                        {parse(taskDetailModal.description)}
                      </span>
                    ) : (
                      <div>
                        <Editor
                          name="description"
                          initialValue={taskDetailModal.description}
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          init={{
                            height: 200,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | " +
                              "bold italic backcolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                          //onBlur={submitHandler}
                        />
                        <button
                          className="btn btn-primary my-3 me-2"
                          onClick={() => {
                            dispatch({
                              type: CHANGE_MODAL,
                              name: "description",
                              value: editorRef.current.getContent(),
                            });
                            setVisibleEditor(false);
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setVisibleEditor(false);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
                  {/* <div style={{ fontWeight: 500, marginBottom: 10 }}>
                    Jira Software (software projects) issue types:
                  </div>
                  <div className="title">
                    <div className="title-item">
                      <h3>
                        BUG <i className="fa fa-bug" />
                      </h3>
                      <p>
                        A bug is a problem which impairs or prevents the
                        function of a product.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        STORY <i className="fa fa-book-reader" />
                      </h3>
                      <p>
                        A user story is the smallest unit of work that needs to
                        be done.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        TASK <i className="fa fa-tasks" />
                      </h3>
                      <p>A task represents work that needs to be done</p>
                    </div> */}
                  {/* </div> */}
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img src="./assets/img/download (1).jfif" alt="avt" />
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div
                          className="display-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img
                              src="./assets/img/download (1).jfif"
                              alt="avt"
                            />
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{ color: "#929398" }}>Edit</span>•
                              <span style={{ color: "#929398" }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      className="form-control"
                      value={taskDetailModal.statusId}
                      onChange={(e) => handleChange(e)}
                    >
                      {allStatus.map((status, index) => {
                        return (
                          <option key={index} value={status.statusId}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees mt-3">
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {taskDetailModal.assigness.map((user, index) => {
                        return (
                          <div className="col-6 mb-2" key={index}>
                            <div className="item me-0 d-flex align-items-center">
                              <div className="avatar me-1">
                                <img src={user.avatar} alt="avt" />
                              </div>

                              <p className="name">{user.name}</p>
                              <p
                                className="name"
                                onClick={() => {
                                  console.log("HEELO");
                                  dispatch({
                                    type: REMOVE_ASSIGNEE,
                                    userId: user.id,
                                  });
                                }}
                              >
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 5, cursor: "pointer" }}
                                />
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <div className="col-6">
                        <select
                          className="form-control"
                          style={{ width: "100%" }}
                          placeholder="Please select"
                          onBlur={(e) => {
                            let selectedMember = projectDetail.members.find(
                              (mem) => mem.userId == e.target.value
                            );
                            selectedMember = {
                              ...selectedMember,
                              id: selectedMember.userId,
                            };
                            dispatch({
                              type: CHANGE_ASSIGNESS,
                              user: selectedMember,
                            });
                          }}
                        >
                          {projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetailModal.assigness?.findIndex(
                                (u) => u.id === mem.userId
                              );
                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((mem, index) => {
                              return (
                                <option key={index} value={mem.userId}>
                                  {mem.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <p>
                        Click anywhere after choosing to add member to this
                        project
                      </p>
                    </div>
                  </div>

                  <div className="priority mt-3" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskDetailModal.priorityTask.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {allPriority.map((p, index) => {
                        return (
                          <option key={index} value={p.priorityId}>
                            {p.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      name="originalEstimate"
                      type="number"
                      className="estimate-hours"
                      defaultValue={taskDetailModal.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    <div style={{ display: "flex" }}>
                      <i className="fa fa-clock" />
                      <div style={{ width: "100%" }}>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${
                                (Number(taskDetailModal.timeTrackingSpent) /
                                  (Number(taskDetailModal.timeTrackingSpent) +
                                    Number(
                                      taskDetailModal.timeTrackingRemaining
                                    ))) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="logged">
                            {taskDetailModal.timeTrackingSpent}h logged
                          </p>
                          <p className="estimate-time">
                            {taskDetailModal.timeTrackingRemaining}h estimated
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <h6>CHANGE TIME TRACKING</h6>
                      <div className="col-6">
                        <input
                          className="form-control"
                          name="timeTrackingSpent"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          name="timeTrackingRemaining"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;