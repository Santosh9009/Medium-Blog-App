import React, { useState } from "react";
import axios from "axios";

interface EditBlogProps {
  id: string | undefined;
  initialTitle: string;
  initialContent: string;
  initialPublishDate?: string;
  onSave: (editedTitle: string, editedContent: string,editedPublishDate?: string) => void;
}

export const EditBlog: React.FC<EditBlogProps> = ({ id, initialTitle, initialContent, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(initialTitle);
  const [editedContent, setEditedContent] = useState(initialContent);

  const handleSaveClick = async () => {
    const currentDate = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const newDate = `${
      monthNames[currentDate.getMonth()]
    } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    try {
      await axios.put(
        "http://localhost:8787/api/v1/blog/update",
        {
          id: id,
          title: editedTitle,
          content: editedContent,
          publishDate: newDate, // Use edited publish date if available, otherwise use current date
        },
        {
          headers: headers,
        }
      );
      onSave(editedTitle, editedContent, newDate);
      alert("Updated successfully!");
    } catch (error) {
      alert("Failed to update.");
    }
  };

  return (
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
      <button
        onClick={handleSaveClick}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </>
  );
};

