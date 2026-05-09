import { type Blog } from "../hooks"

function BlogContent( { blog } : { blog : Blog}  ) {
  return (
    <div className="flex justify-center">
        <div className=" grid grid-cols-12 px-10 w-full pt-15 max-w-screen-2xl">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold"> { blog.title } </div>

                <div className="text-slate-500 pt-4"> Posted on 2nd December 2023 </div>

                <div className=" pt-2"> {blog.content} </div>

            </div>
              

            <div className="col-span-4">
                {blog.author.username}
            </div>

        </div>

    </div>
  )
}

export default BlogContent