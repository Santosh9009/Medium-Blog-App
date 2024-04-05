import { useEffect, useRef } from "react";
import '../App.css'

export const Createblog = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    titleRef.current?.focus();
  });


  return (
    <div className="h-screen w-full flex justify-center py-20 fade-in">
  <div className="w-full max-w-3xl mx-auto font-serif px-5">
    <div className="flex flex-col gap-3">
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
      />
      <textarea
        onKeyUp={(e) => {
          if (e.key === "Backspace" && e.currentTarget.value === "") {
            titleRef.current?.focus();
          }
        }}
        ref={contentRef}
        className="text-lg md:text-2xl focus:outline-none min-h-56 px-4 py-2"
        id="content"
        placeholder="Tell your story here..."
      />
    </div>
  </div>
</div>
  );
};
