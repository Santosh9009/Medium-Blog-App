import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const EditBlog = () => {
  const { id } = useParams<{ id: string }>();


  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.put(`${BACKEND_URL}/api/v1/blog/mypost`,{
      headers: headers
    }).then((res) => {
      setBlogs(res.data.posts);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <h1>Edit Blog</h1>
      <input type="text" defaultValue={title} />
      <textarea defaultValue={content}></textarea>
    </div>
  );
};

