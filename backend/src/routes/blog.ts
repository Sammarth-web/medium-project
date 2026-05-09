import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign , verify , decode } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@sammarthdev/medium-common-1";
import z from "zod";

export const blogRouter = new Hono<{
  Bindings : {
    DATABASE_URL : string
  },
  Variables :{
    userId : string
  }
}>()


// Adding middlewares ->extact the author id and pass it down to other handler

// how to pass data from middleware -> furhter hanlder

// c -> means add all context inside this c
// use this as store and put more data here ( state full calls )
// pass from middleware to my next handlers
blogRouter.use('/*' , async( c , next) => {

  const authHeader = await c.req.header("authorization") || ""
  const user =  await verify( authHeader , "secret" , "HS256") as { id : string }
  // how frontend tells that user is valid and logged in 
  // bca in token i have set the user id.

  if(user){
    // how this got fixed ?
    c.set("userId" , user.id );
    await next();
  }else{
    c.status(403)
    return c.json({
        message : "You are not logged in"
    })
  }
})


// Post, Update List down all blogs
blogRouter.post('/', async (c) => {

  const dbUrl = c.env.DATABASE_URL
  const authorId = c.get("userId")

  const prisma = new PrismaClient({
    accelerateUrl: dbUrl,
  } ).$extends(withAccelerate())

  const body = await c.req.json()
  const {success} = createBlogInput.safeParse(body)

  if( !success ){
    c.status(411);
    return c.json({
      "mesage" : "Invalid Inputs"
    })
  }

  const blog = await prisma.post.create({
    data : {
        title : body.title,
        content : body.content,
        authorId : authorId
    }

  })

  return c.json({
    id : blog.id
  })

})


// this will update the current posts
blogRouter.put('/:id', async (c) => {
  const dbUrl = c.env.DATABASE_URL

  const blogId = c.req.param("id")
 
  const prisma = new PrismaClient({
    accelerateUrl: dbUrl,
  } ).$extends(withAccelerate())

  const body = await c.req.json()

  const {success} = updateBlogInput.safeParse(body)

  if( !success ){
    c.status(411);
    return c.json({
      "mesage" : "Invalid Inputs"
    })
  }


  const blog = await prisma.post.update({
    where : {
        id : String(blogId)
    },
    data : { 
        title : body.title,
        content : body.content
    }
  })

    return c.json({
        id : blog.id
    })


})


// get all posts
// add pagination and this endpoints
blogRouter.get('/bulk', async (c) => {
  const dbUrl = c.env.DATABASE_URL
  const prisma = new PrismaClient({
    accelerateUrl: dbUrl,
  } ).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    include : {
      author : {
        select : {
          username : true
        }
      }
    }
  })

  return c.json( blogs )
  
})



// show specifi blog from data base
blogRouter.get('/:id', async (c) => {

  const dbUrl = c.env.DATABASE_URL
  const prisma = new PrismaClient({
    accelerateUrl: dbUrl,
  } ).$extends(withAccelerate())
  
  const blogId = await c.req.param("id")

  try{
    const blog = await prisma.post.findFirst({
        where : {
            id : String(blogId)
        },
        include : {
          author : {
            select : {
              username : true
            }
          }
        }
    })

    return c.json(blog)

  }catch(e){
    c.status(411)
    return c.json({
        message : "Error while fetching blogs from database"
    })
  }
  
})


