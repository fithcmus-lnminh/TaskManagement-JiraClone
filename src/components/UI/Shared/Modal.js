import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import {
  DELETE_COMMENT_SAGA,
  EDIT_COMMENT_SAGA,
  GET_ALL_COMMENT_SAGA,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASKTYPE_SAGA,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API,
  HIDE_INPUT_MODAL,
  INSERT_COMMENT_SAGA,
  SWITCH_INPUT_MODAL,
} from "../../../redux/consts/taskManagement";
import {
  CHANGE_ASSIGNESS,
  CHANGE_MODAL,
  CHANGE_TASK_ID,
  REMOVE_ASSIGNEE,
} from "../../../redux/consts/taskManagement/task";
import { Editor } from "@tinymce/tinymce-react";
import { CloseOutlined } from "@ant-design/icons";
import { USER_LOGIN } from "../../../utils/settingSystem";
import * as Yup from "yup";
import { withFormik } from "formik";

const Modal = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
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
  const { editInput } = useSelector((state) => state.modalReducer);
  const handleChangeValue = (e) => {
    dispatch({
      type: HANDLE_CHANGE_POST_API,
      actionType: CHANGE_MODAL,
      name: e.target.name,
      value: e.target.value,
    });
    // dispatch({
    //   type: CHANGE_MODAL,
    //   name: e.target.name,
    //   value: e.target.value,
    // });
  };
  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASKTYPE_SAGA });
  }, []);

  useEffect(() => {
    setFieldValue("taskId", taskDetailModal.taskId);
  }, [taskDetailModal.taskId]);

  return (
    <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark me-2" />

              <select name="typeId" onChange={handleChangeValue}>
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
                    <p
                      style={{ fontWeight: "bold" }}
                      onClick={() => {
                        setVisibleEditor(true);
                      }}
                    >
                      Description
                    </p>
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
                            setVisibleEditor(false);
                            dispatch({
                              type: HANDLE_CHANGE_POST_API,
                              actionType: CHANGE_MODAL,
                              name: "description",
                              value: editorRef.current.getContent(),
                            });
                            // dispatch({
                            //   type: CHANGE_MODAL,
                            //   name: "description",
                            //   value: editorRef.current.getContent(),
                            // });
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
                    <h6 style={{ fontWeight: "bold" }} className="mt-3">
                      Comment
                    </h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={
                            JSON.parse(localStorage.getItem(USER_LOGIN)).avatar
                          }
                          alt="avt"
                        />
                      </div>
                      <form className="input-comment" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          name="contentComment"
                          placeholder="Add a comment ..."
                          onChange={handleChange}
                          onClick={() => {
                            setFieldValue("submitType", "ADD");
                          }}
                        />
                        {errors.contentComment && touched.contentComment && (
                          <div className="text-danger">
                            {errors.contentComment}
                          </div>
                        )}
                      </form>
                    </div>
                    <div
                      className="lastest-comment"
                      style={{ maxHeight: "30rem", overflow: "auto" }}
                    >
                      {taskDetailModal.lstComment
                        .slice(0)
                        .reverse()
                        .map((cmt, index) => {
                          return (
                            <div className="comment-item" key={index}>
                              <div
                                className="display-comment mt-3"
                                style={{ display: "flex" }}
                              >
                                <div className="avatar">
                                  <img src={cmt.avatar} alt="avt" />
                                </div>
                                <div>
                                  <p
                                    style={{
                                      marginBottom: 5,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {cmt.name}
                                  </p>
                                  <div style={{ marginBottom: 5 }}>
                                    {editInput.isOpen &&
                                    editInput.index === index ? (
                                      <form
                                        className="input-comment"
                                        onSubmit={handleSubmit}
                                        style={{ width: "28.5rem" }}
                                      >
                                        <input
                                          defaultValue={cmt.commentContent}
                                          name="contentComment"
                                          onChange={handleChange}
                                          onClick={() => {
                                            setFieldValue("commentId", cmt.id);
                                            setFieldValue("submitType", "EDIT");
                                          }}
                                        ></input>
                                      </form>
                                    ) : (
                                      <p className="mb-0">
                                        {cmt.commentContent}
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    <span
                                      className="me-1"
                                      style={{
                                        color: "#929398",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        dispatch({
                                          type: SWITCH_INPUT_MODAL,
                                          index: index,
                                        });
                                      }}
                                    >
                                      Edit
                                    </span>
                                    •
                                    <span
                                      className="ms-1"
                                      style={{
                                        color: "#929398",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        dispatch({
                                          type: DELETE_COMMENT_SAGA,
                                          commentId: cmt.id,
                                        });
                                        dispatch({
                                          type: GET_TASK_DETAIL_SAGA,
                                          taskId: taskDetailModal.taskId,
                                        });
                                      }}
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
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
                      onChange={(e) => handleChangeValue(e)}
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
                                  dispatch({
                                    type: HANDLE_CHANGE_POST_API,
                                    actionType: REMOVE_ASSIGNEE,
                                    userId: user.id,
                                  });
                                  // dispatch({
                                  //   type: REMOVE_ASSIGNEE,
                                  //   userId: user.id,
                                  // });
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
                              type: HANDLE_CHANGE_POST_API,
                              actionType: CHANGE_ASSIGNESS,
                              user: selectedMember,
                            });
                            // dispatch({
                            //   type: CHANGE_ASSIGNESS,
                            //   user: selectedMember,
                            // });
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
                        handleChangeValue(e);
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
                        handleChangeValue(e);
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
                          onChange={handleChangeValue}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          name="timeTrackingRemaining"
                          onChange={handleChangeValue}
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

const ModalWithFormik = withFormik({
  mapPropsToValues: (props) => {
    const { taskDetailModal } = props;
    return {
      taskId: taskDetailModal?.taskId,
      commentId: 0,
      contentComment: "",
      submitType: "",
    };
  },

  validationSchema: Yup.object().shape({
    //contentComment: Yup.string().required("Comment can not be empty"),
    //editComment: Yup.string().required("Comment can not be empty"),
  }), //validate from field

  handleSubmit: (values, { props, setSubmitting }) => {
    if (values.contentComment === "") return;
    if (values.submitType === "ADD")
      props.dispatch({ type: INSERT_COMMENT_SAGA, cmtModel: values });
    else if (values.submitType === "EDIT") {
      props.dispatch({ type: EDIT_COMMENT_SAGA, cmtModel: values });
      props.dispatch({ type: HIDE_INPUT_MODAL });
    }
  },

  displayName: "Modal",
})(Modal);

const mapStateToProps = (state) => ({
  taskDetailModal: state.taskReducer.taskDetailModal,
  editInput: state.modalReducer.editInput,
});

export default connect(mapStateToProps)(ModalWithFormik);
