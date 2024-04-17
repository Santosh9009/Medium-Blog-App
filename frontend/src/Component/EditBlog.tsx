import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import img2 from "../assets/icons8-back-50.png";
import { toast } from "react-toastify";
import { currentDate } from "../hooks/Functions";
import { BACKEND_URL } from "../config";

interface EditBlogProps {
  id: string | undefined;
  initialTitle: string;
  initialContent: string;
  onSave: (
    editedTitle: string,
    editedContent: string,
    editedPublishDate?: string
  ) => void;
  setEditmode: (editMode: boolean) => void;
}

export const EditBlog: React.FC<EditBlogProps> = ({
  id,
  initialTitle,
  initialContent,
  onSave,
  setEditmode,
}: EditBlogProps) => {
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const [editedContent, setEditedContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // for auto increase the height of the textarea 
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [editedContent]);

  const handleSaveClick = async () => {

    const newDate = currentDate();
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog/update`,
        {
          id: id,
          title: editedTitle,
          content: editedContent,
          publishDate: newDate,
        },
        {
          headers: headers,
        }
      );
      onSave(editedTitle, editedContent, newDate);
      toast.success("Updated successfully!");
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <img
          onClick={() => setEditmode(false)}
          className="h-10 w-10 hover:opacity-50"
          src={img2}
          alt=""
        />
        <button
          onClick={handleSaveClick}
          className="bg-green-600 text-white px-4 py-2 rounded-full font-medium font-sans hover:bg-green-800"
        >
          Publish
        </button>
      </div>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        className="font-bold text-5xl text-black focus:outline-none"
      />
      <textarea
        ref={textareaRef}
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="text-lg leading-loose focus:outline-none resize-none overflow-y-hidden h-full"
      />
    </>
  );
};
