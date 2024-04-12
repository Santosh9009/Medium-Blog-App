import { useNavigate } from 'react-router-dom';
import img from '../assets/icons8-write-60.png'
import { useEffect } from 'react';
import { BACKEND_URL } from '../config';
import { useRecoilState } from 'recoil';
import { UserState } from '../Store/Atoms';
import axios from 'axios';



const Appbar = () => {
  const navigate = useNavigate();
  const color = localStorage.getItem('color')
  const [ user, setUser ] = useRecoilState(UserState)


  useEffect(()=>{
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios.get(`${BACKEND_URL}/api/v1/user/me`, {
      headers: headers,
    }).then((res) => {
    setUser({
      name:res.data.user.name,
      email:res.data.user.email,
      password:res.data.user.password
    })
    })
  },[])

  
  return (
    <div className='w-full flex justify-between px-5 py-3 border-2'>
      <button onClick={()=>{
        navigate('/blogs')
      }} className='font-medium text-2xl font-serif'>Medium</button>
      <div>
        <div className='flex items-center gap-6'>
        <button onClick={()=>{
          navigate('/create')
        }} className='font-light text-base md:text-lg hover:opacity-50'>
          <div className='flex gap-1'>
          <img className='w-6 h-6 ' src={img} alt="" />Write
          </div>
          </button>
     <button onClick={()=>{
        navigate('/profile')
      }} className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-2   hover:bg-black transition-all duration-200 ${color}`}>
          <span className="font-medium text-white ">
           {!user.name? "X" : user.name.slice(0,1).toUpperCase()}
          </span>
        </button>
        </div>
      </div>
    </div>
  )
}


export default Appbar