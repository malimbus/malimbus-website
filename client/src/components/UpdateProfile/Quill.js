import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../AddPost/EditorToolbar";
import "react-quill/dist/quill.snow.css";
// import "./Editor.module.css";

export const Quill = ({ profile, setProfile }) => {
  const handleChange = value => {
    setProfile({...profile, about: value})
  }


  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={profile?.about || ''}
        onChange={handleChange}
        placeholder={"Long Biography"}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Quill;
