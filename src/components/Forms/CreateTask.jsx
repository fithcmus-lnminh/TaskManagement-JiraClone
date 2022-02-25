import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  CREATE_TASK_SAGA,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASKTYPE_SAGA,
  GET_ALL_USER_SAGA,
  SET_SUBMIT_EDIT_PROJECT,
} from "../../redux/consts/taskManagement";
import { withFormik } from "formik";
import * as Yup from "yup";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const CreateTask = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const { allProject, allTaskType, allPriority, allStatus } = useSelector(
    (state) => state.ProjectReducer
  );
  const { allUsers } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_SAGA });
    dispatch({ type: GET_ALL_TASKTYPE_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_USER_SAGA });
    dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFn: handleSubmit });
  }, []);

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label style={{ fontWeight: "bold" }}>Project</label>
        <select
          name="projectId"
          className="form-control"
          onChange={handleChange}
        >
          {allProject.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <label style={{ fontWeight: "bold" }}>Task Name</label>
        <input
          name="taskName"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Task Type</label>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
              {allTaskType.map((type, index) => {
                return (
                  <option key={index} value={type.id}>
                    {type.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Priority</label>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
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
        </div>
        <div className="col-4">
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Status</label>
            <select
              name="statusId"
              className="form-control"
              onChange={handleChange}
            >
              {allStatus.map((s, index) => {
                return (
                  <option key={index} value={s.statusId}>
                    {s.statusName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <label style={{ fontWeight: "bold" }}>Assignees</label>
            <Select
              mode="multiple"
              size={"large"}
              placeholder="Please select"
              optionFilterProp="children"
              onChange={(values) => {
                setFieldValue("listUserAsign", values);
              }}
              style={{ width: "100%" }}
            >
              {allUsers.map((user, index) => {
                return <Option key={user.userId}>{user.name}</Option>;
              })}
            </Select>
            <label
              className=""
              style={{ fontWeight: "bold", marginTop: "30px" }}
            >
              Original Estimate
            </label>
            <input
              className="form-control"
              name="originalEstimate"
              type="number"
              min="0"
              defaultValue="0"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label style={{ fontWeight: "bold" }}>Time tracking</label>
            <Slider
              defaultValue={0}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              value={timeTracking.timeTrackingSpent}
            />
            <div className="row mb-3">
              <div className="col-6 text-left">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label style={{ fontWeight: "bold" }}>Time spent</label>
                <input
                  defaultValue="0"
                  min="0"
                  name="timeTrackingSpent"
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                />
              </div>
              <div className="col-6">
                <label style={{ fontWeight: "bold" }}>Time remaining</label>
                <input
                  defaultValue="0"
                  min="0"
                  name="timeTrackingRemaining"
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description" style={{ fontWeight: "bold" }}>
          Description
        </label>
        <Editor
          name="description"
          //initialValue={values.description}
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
          onChange={() => {
            setFieldValue("description", editorRef.current.getContent());
          }}
        />
      </div>
    </form>
  );
};

const CreateTaskWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      taskName: "",
      description: "",
      statusId: props.allStatus[0]?.statusId,
      originalEstimate: "",
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: props.allProject[0]?.id,
      typeId: props.allTaskType[0]?.id,
      priorityId: props.allPriority[0]?.priorityId,
      listUserAsign: [],
    };
  },

  //validatate input values
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: CREATE_TASK_SAGA, task: values });
  },

  displayName: "CreateTask",
})(CreateTask);

const mapStateToProps = (state) => ({
  allProject: state.ProjectReducer.allProject,
  allTaskType: state.ProjectReducer.allTaskType,
  allPriority: state.ProjectReducer.allPriority,
  allStatus: state.ProjectReducer.allStatus,
});

export default connect(mapStateToProps)(CreateTaskWithFormik);
