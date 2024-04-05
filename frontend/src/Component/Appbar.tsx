import { useNavigate } from 'react-router-dom';


const Appbar = () => {
  const navigate = useNavigate();


  const color = localStorage.getItem('color')

  
  return (
    <div className='w-full flex justify-between px-5 py-3 border-2'>
      <button onClick={()=>{
        navigate('/blogs')
      }} className='font-medium text-xl'>Medium</button>
      <div>
        <div className='flex items-center gap-6'>
        <button onClick={()=>{
          navigate('/create')
        }} className='font-light text-xl hover:text-slate-400'>Write</button>
     <button onClick={()=>{
        navigate('/profile')
      }} className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-2   hover:bg-black transition-all duration-200 ${color}`}>
          <span className="font-medium text-white ">
           H
          </span>
        </button>
        </div>
      </div>
    </div>
  )
}


export default Appbar