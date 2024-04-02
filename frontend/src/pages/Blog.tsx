import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export const Blog = () => {
  const {id} = useParams<{id:string}>();
  const {blog, loading} =  useBlog(id) 

  if(loading){
    <div>loading</div>
  }
  
  return (
    <div className="grid grid-cols-2">
      <div></div>
    </div>
  )
}

