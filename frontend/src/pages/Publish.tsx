import { useState } from "react"
import AppBar from "../components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { type CreateBlogInput } from "@sammarthdev/medium-common-1"
import { useNavigate } from "react-router-dom"




function Publish() {

  const navigate = useNavigate()
  const [ articleData , setArticleData ] = useState<CreateBlogInput>({
    title : "",
    content : "",
  })

  const [ loading , setLoading ] = useState(false)

  async function publishOnClick () {
    try{
        console.log("API HIT -->")
        setLoading(true)

        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, articleData , {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })

        console.log("Resonse Got -->")
        console.log(response)

        const blogId = response.data.id 
        setLoading(false)

        alert(`Blog created with this id ${blogId}`)
        navigate(`/blog/${blogId}`)
         
    }catch(e){
        console.log(e)
        setLoading(false)
        alert("Error while publishing posts")
    }

  }

  return (
    <div>
        <AppBar />
        {JSON.stringify(articleData)}



        {/* Input -> title and content */}
        <div className="flex justify-center">
            <div className="mt-2 w-250">
                <label className="block mb-2.5 text-sm font-medium text-heading">Your Title</label>
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                
                <input onChange={ (e) => {
                    setArticleData({
                        ...articleData,
                        title : e.target.value
                    })
                }} type="text" placeholder="Article Title" className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                </div>

                {/* Content text area placed here */}
                <div className="mt-5">

                    <label className="block mb-2.5 text-sm font-medium text-heading">Your Content</label>
                    <textarea onChange={ (e) => {
                        setArticleData({
                            ...articleData,
                            content : e.target.value
                        })
                    }} className="h-70 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600" placeholder="Write your thoughts here..."></textarea>

                </div>

                {/*Publish Button */}
                <button onClick={ () => {
                    publishOnClick()
                }} type="button" className="text-white mt-2 bg-blue-700 box-border cursor-pointer border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                    { loading ? "Loader.." : "Publish" }
                </button>

            </div>
        </div>          

    </div>
  )
}

export default Publish