import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
// import "./Editor.module.css";

export const Editor = ({ setPostData, postData }) => {
  const handleChange = value => {
    setPostData({...postData, content: value})
  }

  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={postData.content || ''}
        onChange={handleChange}
        placeholder={"Write content or abstract here"}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
