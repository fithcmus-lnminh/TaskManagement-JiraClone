import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { SET_SUBMIT_EDIT_PROJECT } from "../../redux/consts/taskManagement";
import { withFormik } from "formik";
import * as Yup from "yup";

const EditProject = (props) => {
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

  const categoryArr = useSelector(
    (state) => state.ProjectCategoryReducer.categoryArr
  );

  useEffect(() => {
    dispatch({ type: "GET_ALL_CATEGORY_SAGA" });
  }, []);

  useEffect(() => {
    //send submit event to redux for let they now what form need to submit
    dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFn: handleSubmit });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-2">
          <div className="form-group">
            <label htmlFor="id" style={{ fontWeight: "bold" }}>
              Project ID
            </label>
            <input
              className="form-control"
              name="id"
              disabled
              value={values.id}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="projectName" style={{ fontWeight: "bold" }}>
              Project Name
            </label>
            <input
              className="form-control"
              name="projectName"
              onChange={handleChange}
              value={values.projectName}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="categoryId" style={{ fontWeight: "bold" }}>
              Project Category
            </label>
            <select
              className="form-control"
              name="categoryId"
              value={values.categoryId}
            >
              {categoryArr.map((cat, index) => (
                <option value={cat.id} key={index}>
                  {cat.projectCategoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="description" style={{ fontWeight: "bold" }}>
              Description
            </label>
            <Editor
              name="description"
              initialValue={values.description}
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
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

const EditProjectWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    console.log(projectEdit);
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },

  //validatate input values
  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
  },

  displayName: "EditProjectFormik",
})(EditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectWithFormik);
