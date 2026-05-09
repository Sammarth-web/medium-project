import { useEffect, useState } from 'react'
import { Avatar } from './BlogCard'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";



function AppBar() {

  const navigate = useNavigate();
  const [ isLogin , setIsLogin ] = useState(false)

  useEffect(()=>{

    const token = localStorage.getItem("token")
    if(!token){
      setIsLogin(false)
    }else{
      setIsLogin(true)
    }

  },[])

  function handleLogout () {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/signin");
  }

  return (
    <div className='flex justify-between border-b px-10 py-4'>
        <Link to = {"/blogs"} >
          <div className='flex flex-col justify-center cursor-pointer font-bold'> Medium </div>
        </Link> 

        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Publish</button>
            </Link>

            { isLogin ? <button onClick={handleLogout} type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
              Log Out
            </button> : ""}

            <Avatar size={"big"} name="SamKodes" />
        </div>

    </div>
  )
}

export default AppBar