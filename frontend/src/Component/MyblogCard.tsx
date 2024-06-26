import { useNavigate } from "react-router-dom";
import img from '../assets/icons8-enter-50 (1).png'
import '../App.css'

interface Blog {
  authorname: string;
  publishDate: string;
  title: string;
  content: string;
  id?: string;
}

export const MyblogCard = ({
  publishDate,
  title,
  content,
  id,
}: Blog) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/myblog/${id}`);
  };



  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-1 my-5 w-[70%] mx-auto slide-in-left"
    >
      <div className="flex items-center justify-start gap-2 mb-3">
        <div className="text-slate-500 inline-block">
          {publishDate || "3 Jan,2024"}
        </div>
      </div>
      <div className="font-medium text-2xl md:text-3xl font-sans">{title}</div>
      <div className="text-base md:text-lg font-inter text-gray-700 line-clamp-2">
        {content}..
      </div>
      <div className="flex w-full justify-between items-center">
      <div className="text-slate-500 font-medium my-3">
        {Math.floor(content.length / 100)} min read
      </div>
        <img onClick={handleClick} className="w-6 h-6 hover:opacity-50" src={img} alt="" />
      </div>
      <div className="bg-slate-200 h-[.15rem]"></div>
    </div>
  );
};
