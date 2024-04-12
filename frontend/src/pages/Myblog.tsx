import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import img from '../assets/icons8-menu-vertical-64.png'
import { EditBlog } from "../Component/EditBlog";

interface Blog {
  id: string;
  title: string;
  content: string;
  publishDate: string;
}

export const Myblog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blog: initialBlog, loading } = useBlog(id || " ");
  const [editMode, setEditMode] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(initialBlog || null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if(initialBlog){
      setBlog(initialBlog)
    }
  }, [initialBlog]);

  const handleEditOption = () => {
    setEditMode(true);
    setDropdownOpen(false);
  };

  const handleDeleteOption = () => {
 
    setDropdownOpen(false);
  };

  const handleSaveEdit = (editedTitle: string, editedContent: string, editedPublishDate?: string) => {
    setEditMode(false);
    // Update the state with edited values
    if (blog) {
      setBlog({
        ...blog,
        title: editedTitle,
        content: editedContent,
        publishDate: editedPublishDate || blog.publishDate
      });
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
            <EditBlog
              setEditmode={setEditMode}
              id={id}
              initialTitle={blog?.title || ""}
              initialContent={blog?.content || ""}
              onSave={(editedTitle, editedContent, editedPublishDate) =>
                handleSaveEdit(editedTitle, editedContent, editedPublishDate)
              }
            />
            </>
          ) : (
            <>
              <div className="font-bold text-2xl md:text-5xl">
                {blog?.title}
              </div>
              <div className="flex justify-between items-center">
                <div>{blog?.publishDate}</div>
                <div className="relative">
                  <img
                    className="w-6 h-6 rounded hover:opacity-50"
                    src={img}
                    alt=""
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                      <button
                        onClick={handleEditOption}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDeleteOption}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-lg leading-loose">{blog?.content}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
