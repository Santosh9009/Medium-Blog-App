import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";




interface Blog {
  id: number;
  title: string;
  content: string;
  publishDate: string;
  author: {
    name: string
  }
  // Add other properties as needed
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
      headers: headers
    }).then((res) => {
      setBlogs(res.data.posts);
      setLoading(false);
    });
  }, []);

  return {
    blogs,
    loading,
  };
};
