import { useParams } from "react-router-dom"
import AppBar from "../components/AppBar"
import BlogContent from "../components/BlogContent"
import { useBlog } from "../hooks"

function Blog() {

  const {id} = useParams()

  const { loading , blog } = useBlog({
    id : id || ""
  })
  
  return (
    <div>
      <AppBar />

      { loading || !blog ? "Loader BKL" : < BlogContent blog = {blog} /> }

    </div>
  )
}

export default Blog