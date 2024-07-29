import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export interface blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      setBlogs(res.data);
      setLoading(false);

      console.log(res.data);
    };
    fetchBlogs();
  }, []);
  return {
    loading,
    blogs,
  };
};
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data);

        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};
// export const useBlogs = () => {
//   const [loading, setLoading] = useState(true);
//   const [blogs, setBlogs] = useState<blog[]>([]);

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8787/api/v1/blog/bulk`, {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         setBlogs(response.data.blogs);
//         setLoading(false);
//       });
//   }, []);

//   return {
//     loading,
//     blogs,
//   };
// };
