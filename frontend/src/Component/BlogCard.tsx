import { useNavigate } from "react-router-dom";

interface Blog {
  authorname: string,
  publishDate: string,
  title: string,
  content: string,
  id:string
}
const BlogCard = ({ authorname, publishDate, title, content,id }: Blog) => {

  const navigate = useNavigate();

  function navigator():void{
    navigate(`/blog/${id}`)
  }

  return (
    <div onClick={navigator} className="flex flex-col gap-1 my-5 w-[70%] mx-auto">
      <div className="flex items-center gap-2">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-2">
          <span className="font-medium text-gray-600 ">
            {authorname!==null?authorname.toUpperCase().slice(0, 1):null}
          </span>
        </div>
        <div>{authorname}</div>
        <div className="w-[.2rem] h-[.2rem] rounded-full bg-slate-500"></div>
        <div className="text-slate-500 inline-block">{publishDate}</div>
      </div>
      <div className="font-bold text-3xl">{title}</div>
      <div className="text-xl font-serif text-gray-700">
        {content.length >= 100 ? content.slice(0, 100) : content}...
      </div>
      <div className="text-slate-500 font-medium my-5">
        {Math.floor(content.length / 100)} min read
      </div>
      <div className="bg-slate-200 h-[.15rem]"></div>
    </div>
  );
};

export default BlogCard;
