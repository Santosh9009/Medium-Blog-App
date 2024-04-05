import { useParams } from "react-router-dom";
import { useMyblogs } from "../hooks";


export const Myblog = () => {
  const { id } = useParams<{ id: string }>();
  const {blogs, loading} = useMyblogs();

  const blog = blogs.find(e=>e.id===id)

  if(loading){
    return <div></div>
  }

  
  return (
    <div className="flex justify-center">
      <div className="max-w-2xl m-auto py-20 font-serif">
        <div className="flex flex-col gap-10">
        <div className="font-bold text-5xl">{blog?.title}</div>
        <div className=" text-lg leading-loose">{blog?.content}</div>
        </div>
      </div>
    </div>
  )
}

