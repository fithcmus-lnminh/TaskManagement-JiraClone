import React, { useRef } from "react";
import Index from "../UI/Index";
import { Editor } from "@tinymce/tinymce-react";

const CreateProject = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
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
        <form>
          <div className="form-group">
            <label htmlFor="projectName">Name</label>
            <input className="form-control" name="projectName" />
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
            <select name="categoryId" className="form-control">
              <option>Software</option>
              <option>Website</option>
              <option>Game</option>
              <option>Mobile</option>
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

export default CreateProject;
