import { useNavigate } from "react-router-dom"


const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <div className="flex justify-between items-center px-6 md:px-16 py-3 bg-yellow-500 border-b-[.1rem] border-black">
        <div className="text-2xl md:text-4xl font-serif">Medium</div>
        <button onClick={()=>{
          navigate('/signin')
        }} className="px-6 py-3 bg-black hover:bg-gray-700 text-base md:text-lg text-white rounded-full font-medium">Signin</button>
      </div>
      <div className="h-[90vh] flex flex-col justify-center items-start bg-yellow-500 px-10 md:px-24 gap-8">
        <div className="font-serif text-4xl md:text-6xl lg:text-9xl">Stay Curious</div>
        <div className="text-lg md:text-2xl">Discover stories, thinking, and expertise from writers on any topic.</div>
        <button onClick={()=>{
          navigate('/signup')
        }} className="px-6 py-2 md:px-8 md:py-3 lg:px-10 lg:py-4 text-lg md:text-xl lg:text-xl bg-black text-white rounded-full font-medium hover:bg-white hover:text-black">Get Started</button>
      </div>
    </div>
  )
}

export default Home