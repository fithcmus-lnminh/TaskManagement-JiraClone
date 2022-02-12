import React, { useEffect, useRef } from "react";
import Index from "../UI/Index";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";

const CreateProject = (props) => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const categoryArr = useSelector(
    (state) => state.ProjectCategoryReducer.categoryArr
  );

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  useEffect(() => {
    dispatch({ type: "GET_ALL_CATEGORY_SAGA" });
  }, []);

  const log = () => {
    setFieldValue("description", editorRef.current.getContent());
  };

  return (
    <Index>
      <div className="container w-50">
        <div className="header mt-3">
          <nav aria-label="breadcrumb">
            <ol
              className="breadcrumb pl-0 mb-0"
              style={{ backgroundColor: "white" }}
            >
              <li className="breadcrumb-item">Projects</li>
              <li className="breadcrumb-item">singularity 1.0</li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Project
              </li>
            </ol>
          </nav>
        </div>
        <h3 className="" style={{ fontWeight: "bold" }}>
          Create Project
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">Name</label>
            <input
              className="form-control"
              name="projectName"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Editor
              name="description"
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select
              name="categoryId"
              className="form-control"
              onChange={handleChange}
            >
              {categoryArr.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <button onClick={log} type="submit" className="btn btn-primary mt-3">
            Create Project
          </button>
        </form>
      </div>
    </Index>
  );
};

const CreateProjectWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.categoryArr[0]?.id,
    };
  },

  //validatate input values
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
  },

  displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => ({
  categoryArr: state.ProjectCategoryReducer.categoryArr,
});

export default connect(mapStateToProps)(CreateProjectWithFormik);
