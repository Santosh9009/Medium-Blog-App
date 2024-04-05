import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


interface Blog {
  id: string;
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

export const useBlog = (id:string)=>{
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
      headers: headers
    }).then((res) => {
      setBlog(res.data.post);
      setLoading(false);
    });
  }, []);

  return {
    blog,
    loading,
  };
}

export const useMyblogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`${BACKEND_URL}/api/v1/blog/mypost`,{
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
