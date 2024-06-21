import { atom } from "recoil";

interface Blog {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  author: {
    name: string
  }
  // Add other properties as needed
}
interface user {
  name:string ,
  email:string ,
  password:string ,
}
  
export const allBlogs = atom<Blog[]>({
  key:'allBlogState',
  default:[]
}) 


export const myblogs = atom<Blog[]>({
  key:'Myblogs',
  default:[]
})

export const UserState = atom<user>({
  key:'UserState',
  default: {name:'', email:'',password:''} ,
})
