import axios from "axios";
// import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BACKEND_URL } from "../config";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <AppBar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />

          <TextEditor
            onChange={(value) => {
              setDescription(value);
            }}
          />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content: description,
                },
                {
                  headers: {
                    authorization: localStorage.getItem("token"),
                  },
                }
              );
              console.log(response);
              if (!title.length || !description.length) {
                return alert("Title and Description can't be empty");
              }
              navigate(`/blog/${response.data.id}`);
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};
// onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
function TextEditor({ onChange }: { onChange: (value: string) => void }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", "medium", "large", "huge"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ font: [] }],
      ["link"],
      ["clean"], // remove formatting button
    ],
  };
  return (
    <div className="mt-2">
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <ReactQuill
              onChange={onChange}
              theme="snow"
              modules={modules}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border h-screen"
            />
            {/* <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2 "
              placeholder="Write an article..."
              required
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
