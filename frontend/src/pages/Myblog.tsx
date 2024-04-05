import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useBlog } from "../hooks";
import axios from "axios";

export const Myblog = () => {
  const { id } = useParams<{ id: string }>();
  const { blog, loading } = useBlog(id || ' ');
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(blog?.title );
  const [editedContent, setEditedContent] = useState(blog?.content);



  useEffect(() => {
    // Set initial values for title and content when blog data is available
    if (blog) {
      setEditedTitle(blog.title);
      setEditedContent(blog.content);
    }
  }, [blog]);

  const handleSaveClick = () => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try{
      axios.put('http://localhost:8787/api/v1/blog/update',{
        id:id,
        title:editedTitle,
        content:editedContent
      },
    {
      headers:headers
    }).then(()=>{
        setEditMode(false);
      })
    }catch{
      alert('Not Updated')
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-sm md:max-w-2xl m-auto py-20 font-serif px-5">
        <div className="flex flex-col gap-10">
          {editMode ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="font-bold text-5xl text-black focus:outline-none"
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="text-lg leading-loose focus:outline-none h-auto"
                rows={15}
              />
              <button onClick={handleSaveClick} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save
              </button>
            </>
          ) : (
            <>
              <div className="font-bold text-2xl md:text-5xl">{blog?.title}</div>
              <div className="text-lg leading-loose">{blog?.content}</div>
              <Link to="#" onClick={()=>{
                setEditMode(true)
              }} className="mt-4 text-blue-500 underline">Edit</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
