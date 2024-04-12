import { useEffect } from "react";
import BlogCard from "../Component/BlogCard"
import { BlogsSkeleton } from "../Component/Sketons/BlogsSkeleton";
import { useBlogs } from "../hooks"
import { allBlogs } from "../Store/Atoms";
import { useRecoilValue } from "recoil";


export const Blogs = () => {
  const blogs = useRecoilValue(allBlogs);
  const {loading} = useBlogs();

  useEffect(()=>{
    console.log(blogs)
  })

  if(loading){
    return <div><BlogsSkeleton/></div>
  }
  

  return (
    <div>
     {blogs && blogs.map((e,index)=><BlogCard key={index} title={e.title} content={e.content} publishDate={e.publishDate} authorname={e.author.name} id={e.id}/>)}
    </div>
  )
}

