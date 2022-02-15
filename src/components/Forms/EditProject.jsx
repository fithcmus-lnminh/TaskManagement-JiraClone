import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import { SET_SUBMIT_EDIT_PROJECT } from "../../redux/consts/taskManagement";

const EditProject = (props) => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    alert("SUBMITTED");
  };

  useEffect(() => {
    //send submit event to redux for let they now what form need to submit
    dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFn: submitHandler });
  }, []);

  return (
    <form className="container-fluid" onSubmit={submitHandler}>
      <div className="row">
        <div className="col-2">
          <div className="form-group">
            <label htmlFor="id" style={{ fontWeight: "bold" }}>
              Project ID
            </label>
            <input className="form-control" name="id" disabled />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="projectName" style={{ fontWeight: "bold" }}>
              Project Name
            </label>
            <input className="form-control" name="projectName" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label htmlFor="projectName" style={{ fontWeight: "bold" }}>
              Project Category
            </label>
            <input className="form-control" name="projectName" />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="projectName" style={{ fontWeight: "bold" }}>
              Description
            </label>
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
        </div>
      </div>
    </form>
  );
};

export default EditProject;
