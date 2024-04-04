import { useEffect, useRef } from "react";

export const Createblog = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    titleRef.current?.focus();
  });


  return (
    <div className="h-screen py-20 bg-red-400">
      <div className="h-full flex flex-col justify-start items-start max-w-lg mx-auto font-serif">
        <div className="flex flex-col gap-3">
          <input
            onKeyDown={(e)=>{
              if(e.key==='Enter'){
                contentRef.current?.focus()
              }
            }}
            ref={titleRef}
            className="text-5xl border-l-[.08rem] border-gray-400 focus:outline-none  pl-5"
            id="content"
            type="text"
            placeholder="Title"
          />
          <input
          onKeyUp={(e)=>{
            if(e.key==='Backspace' && e.currentTarget.value === ""){
              titleRef.current?.focus();
            }
          }}
            ref={contentRef}
            className="text-2xl focus:outline-none min-h-48"
            id="content"
            type="text"
            placeholder="Tell your story here..."
          />
        </div>
      </div>
    </div>
  );
};
