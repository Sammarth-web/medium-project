import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign , verify } from 'hono/jwt';
import { signinInput, signupInput } from "@sammarthdev/medium-common-1";
import z from "zod";
import { process } from "zod/v4/core";

export const userRouter = new Hono<{
  Bindings : {
    DATABASE_URL : string
  }
}>()

userRouter.post('/signup', async (c) => {

  const dbUrl = c.env.DATABASE_URL
  
  const prisma = new PrismaClient({
    accelerateUrl: dbUrl,
  } ).$extends(withAccelerate())

  const body = await c.req.json()
  // validate body is correct or not
  const {success} = signupInput.safeParse(body);
  if( !success ){
    c.status(411);
    return c.json({
      "message" : "Wrong inputs provided"
    })
  }

  const user = await prisma.user.create({
    data : {
      username : body.username,
      password : body.password,
    }
  })

  // create a jwt token using hono
  const token = await sign( { id : user.id} , "secret" )

  return c.json({
    jwt : token
  })
})

// Login and Sign up Blog
userRouter.get('/', (c) => {
  const dbUrl = c.env.DATABASE_URL
  
  return c.json({
    "message" : "working up inside user router",
    "dbUrl" : dbUrl
  })
})

userRouter.post('/signin', async (c) => {

  const dbUrl = c.env.DATABASE_URL
  const prisma = new PrismaClient({
    accelerateUrl: dbUrl,
  } ).$extends(withAccelerate())

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);

  if(!success){
     c.status(411)
     return c.json({
       "message" : "Input are not valid"
     })
  }
  const user =  await prisma.user.findFirst({
    where : {
        username : body.username,
        password : body.password

    }
  })

  if( ! user ){
    c.status(403)
    return c.json({error : "user not exists"})
  }

  // this returns a promise
  const jwt = await sign( {id : user.id} , "secret")
  return c.json({jwt})

})

