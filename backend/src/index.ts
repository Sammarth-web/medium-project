import { Hono } from 'hono'

import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/*', cors({
  origin: '*', // Allows any website to hit your API
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.route("/api/v1/user" , userRouter );
app.route("/api/v1/blog" , blogRouter );


app.get("/check" , (c) => {
  return c.json({
    "message" : " Working Up root dir"
  })
})


export default app

// 1. setup backend project
// 2. Init all routes in hono
// 3. Setup prisma  
// 4. Get cloud sql server
//    setup to avian get connection string 
// postgress - maximum connection string
// aws lambda , cloud functions
// we cannot dir conntect to DB, we can only go via connection pooling in case of cloudfare workers.
// as in serverless backends -> multiple connections are open

// Prisma -> get connection pool url  
// Conclude -> main db url , connection pooling url
// get connetion string ( DB_URL save this in env  file )

// Connectio Pooling url -> prism accelerate
// Databsase Url -> Avien db ( stored inside .env file )


// from toml file-> backend picks these values
// backend connect -> connection pool.
// prisma -> normal movement


// Define schema in prisma file, add relations etc
// Migrate database now.

// run the npx prisma migrate dev --name init_schema command
// this will creates migration folders ( good to go, setup all things )
// Network error : Aws machiene put code there -> git pull -> then copy files

// prisma -> migration sql folder will be visible there.
// Data hase migrated ( avian db ) -> has both Posts and User tables.

// Afer migration -> generate prisma client
// this means i need user object to put data into things.

// we will run --no-engine ( blog pist used to deploy things to cloud worker )
// follow blog post and setup all steps here.
