import { useNavigate } from "react-router-dom";

interface Blog {
  authorname: string,
  publishDate: string,
  title: string,
  content: string,
  id?:string
}

const BlogCard = ({ authorname, publishDate, title, content,id }:Blog ,) => {
  const navigate = useNavigate();

  
function handleclick():void{
    navigate(`/blog/${id}`)
  }


  return (
    <div onClick={handleclick} className="flex flex-col gap-1 my-5 w-[80%] md:w-[50%] mx-auto font-inter">
      <div className="flex items-center justify-start gap-2 mb-3">
        <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-2">
          <span className="font-medium text-gray-600">
            {authorname!==null?authorname.toUpperCase().slice(0, 1):"K"}
          </span>
        </div>
        <div>{authorname!==null?authorname:"Jarvis"}</div>
        <div className="w-[.2rem] h-[.2rem] rounded-full bg-slate-500"></div>
        <div className="text-slate-500 inline-block">{publishDate!==null?publishDate:'3 Jan,2024'}</div>
      </div>
      <div className="font-bold text-2xl md:text-3xl">{title}</div>
      <div className=" text-base md:text-xl text-gray-700 line-clamp-2">
        {content}..
      </div>
      <div className="text-slate-500 font-medium my-5">
        {Math.floor(content.length / 100)} min read
      </div>
      <div className="bg-slate-200 h-[.15rem]"></div>
    </div>
  );
};

export default BlogCard;
