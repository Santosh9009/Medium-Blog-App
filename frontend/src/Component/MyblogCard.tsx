import { useNavigate } from "react-router-dom";

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
      className="flex flex-col gap-1 my-5 w-[70%] mx-auto"
    >
      <div className="flex items-center justify-start gap-2 mb-3">
        <div className="text-slate-500 inline-block">
          {publishDate || "3 Jan,2024"}
        </div>
      </div>
      <div className="font-bold text-2xl md:text-3xl">{title}</div>
      <div className="text-base md:text-xl font-serif text-gray-700 line-clamp-2">
        {content}..
      </div>
      <div className="text-slate-500 font-medium my-5">
        {Math.floor(content.length / 100)} min read
      </div>
      <div className="bg-slate-200 h-[.15rem]"></div>
    </div>
  );
};
