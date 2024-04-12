import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { UserState, allBlogs, myblogs } from "../Store/Atoms";


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

interface user {
  name:string,
  email:string,
  password:string,
}
  

export const useBlogs = () => {
  const setblogs = useSetRecoilState<Blog[]>(allBlogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
      headers: headers
    }).then((res) => {
      setblogs(res.data.posts);
      setLoading(false);
    });
  }, []);

  return {
    loading,
  };
};

export const useMyblogs = () => {
  const setmyblogs = useSetRecoilState<Blog[]>(myblogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`${BACKEND_URL}/api/v1/blog/mypost`,{
      headers: headers
    }).then((res) => {
    setmyblogs(res.data.posts);
      setLoading(false);
    });
  }, []);

  return {
    loading,
  };
};

export const useBlog = (id:string)=>{
  const blogs = useRecoilValue<Blog[]>(myblogs);
  const [loading, setLoading] = useState(true);
  const [blog , setblog] = useState<Blog>();

  useEffect(() => {
   const blog = blogs.find(e=> e.id ===id)
   if(blog){
    setblog(blog)
    setLoading(false);
   }
  }, []);

  return {
    blog,
    loading,
  };
}

export const useUser = ()=>{
const  setUser = useSetRecoilState<user>(UserState);
  useEffect(()=>{
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`${BACKEND_URL}/api/v1/user/me`, {
      headers: headers,
    }).then((res) => {
    setUser({
      name:res.data.user.name,
      email:res.data.user.email,
      password:res.data.user.password
    })
    })
  },[])

}
