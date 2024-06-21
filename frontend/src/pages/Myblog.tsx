import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMyBlog } from "../hooks";
import img from '../assets/icons8-menu-vertical-64.png';
import { EditBlog } from "../Component/EditBlog";
import '../App.css';
import { Spinner } from "../Component/Spinner";
import { ConfirmModal } from "../Component/ConfimModal"; 
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";

interface Blog {
  id: string;
  title: string;
  content: string;
  publishDate: string;
}

export const Myblog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blog: initialBlog, loading } = useMyBlog(id || " ");
  const [editMode, setEditMode] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(initialBlog || null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for showing the modal
  const navigate = useNavigate();

  useEffect(() => {
    if (initialBlog) {
      setBlog(initialBlog);
    }
  }, [initialBlog]);

  const handleEditOption = () => {
    setEditMode(true);
    setDropdownOpen(false);
  };

  const handleDeleteOption = () => {
    setShowConfirmModal(true); // Show the confirmation modal
    setDropdownOpen(false);
  };

  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    setLoad(true);
    try {
      await axios.delete(
        `${BACKEND_URL}/api/v1/blog/delete/${id}`,
        {
          headers: headers,
        }
      );
      setLoad(false);
      navigate('/profile');
      setTimeout(() => toast.success("Deleted successfully!"), 500);
    } catch (error) {
      toast.error("Failed to delete!");
      setLoad(false);
    }
    setShowConfirmModal(false); 
  };

  const handleSaveEdit = (editedTitle: string, editedContent: string, editedPublishDate?: string) => {
    setEditMode(false);

    if (blog) {
      setBlog({
        ...blog,
        title: editedTitle,
        content: editedContent,
        publishDate: editedPublishDate || blog.publishDate
      });
    }
  };

  if (loading || load) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-sm md:max-w-2xl m-auto py-20 font-sans px-5">
        <div className="flex flex-col gap-10 fade-in">
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
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white w-full text-left"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDeleteOption}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white w-full text-left"
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

      {showConfirmModal && (
        <ConfirmModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowConfirmModal(false)}
          message="Are you sure you want to delete this blog post?"
        />
      )}
    </div>
  );
};
