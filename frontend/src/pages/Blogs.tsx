import { BlogCard } from "../components/BlogCard"
import AppBar from "../components/AppBar"
import { UseBlogs } from "../hooks"


function Blogs() {
    // to get all blogs from db we can use my ouwn custom hook
    const {loading , blogs } = UseBlogs()

  return (
    <div>
        <AppBar />

        { 
            loading ? "Loader bkl" : 
            <div className="flex flex-col items-center">
                { blogs.map( (blog) =>  

                    <BlogCard  
                        id = {blog.id}
                        authorName = {blog.author.username}
                        publishedDate = {"08-05-2026" }  
                        title = {blog.title} 
                        content = { blog.content}
                    />
                )}        
        </div>
                
        }
        


    </div>
    
    
  )
}

export default Blogs