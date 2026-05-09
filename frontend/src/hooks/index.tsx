import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"



export interface Blog{
    id: string,
    title: string,
    content: string,
    published: boolean,
    authorId: string ,
    author: {
        username: string
    }   
}


export function useBlog( {id} : { id : string }) {
    const[ loading , setLoading ] = useState(true)
    const[ blog , setBlogs ] = useState<Blog>()

    console.log("id => " , id )

    async function getBlog() {
        try{
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , {
                headers : {
                    Authorization : localStorage.getItem("token")
                },
                data  : {
                    id : id
                }
            })
            const data = response.data

            setLoading(false)
            setBlogs(data)     

        } catch(e){
            console.log(e)
        }
    }


    useEffect( () =>{
        getBlog()
    } ,[id])

    return { loading , blog }

}




export function UseBlogs() {

    const[ loading , setLoading ] = useState(true)
    const[ blogs , setBlogs ] = useState<Blog[]>([])

    async function getAllBlogs() {
        try{
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk` , {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })
            const data = response.data

            setLoading(false)
            setBlogs(data)     

        } catch(e){
            console.log(e)
        }
    }


    useEffect( () =>{
        getAllBlogs()
    } ,[])

    return { loading , blogs }
}
