import { useEffect, useRef, useState } from "react";
import "../App.css";
import axios from "axios";

export const Createblog = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  async function handleclick() {
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
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8787/api/v1/blog/add",
        {
          title: blog.title,
          content: blog.content,
          publishDate: newDate, // Use edited publish date if available, otherwise use current date
        },
        {
          headers: headers,
        }
      )
      setBlog({ title: "", content: "" });
      alert("Published successfully!");
      setLoading(false);
    } catch (error) {
      alert("Failed to Publish.");
    }
  }
 console.log('hi')
  if(loading){
    return <div>loading...</div>
  }

  return (
    <div className="w-full flex justify-center py-10 fade-in">
      <div className="w-full max-w-3xl mx-auto font-serif px-5">
        <div className="w-full flex justify-between items-center mb-5">
          <div className="font-sans text-xl font-medium">
            Publish your own Blog :
          </div>
          <button
            onClick={handleclick}
            className="bg-green-600 text-white px-4 py-2 rounded-full font-medium font-sans hover:bg-green-800"
          >
            Publish
          </button>
        </div>
        <div className="flex flex-col gap-3 pb-5">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                contentRef.current?.focus();
              }
            }}
            ref={titleRef}
            className="text-4xl md:text-5xl border-l-[.08rem] border-gray-400 focus:outline-none px-4 py-2"
            id="content"
            type="text"
            placeholder="Title"
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            value={blog.title}
          />
          <textarea
            onKeyUp={(e) => {
              if (e.key === "Backspace" && e.currentTarget.value === "") {
                titleRef.current?.focus();
              }
            }}
            ref={contentRef}
            className="text-lg md:text-2xl focus:outline-none px-4 mt-10 overflow-hidden resize-none min-h-96 overflow-y-hidden"
            id="content"
            placeholder="Tell your story here..."
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            value={blog.content}
            rows={1}
            onInput={(e) => {
              const target = e.currentTarget;
              const lineHeight = parseFloat(getComputedStyle(target).lineHeight);
              const rows = Math.ceil(target.scrollHeight / lineHeight);
              target.rows = rows > 1 ? rows : 1;
            }}
          />
        </div>
      </div>
    </div>
  );
};
