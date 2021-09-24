import express from 'express'
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import mediaRouter from "./services/index.js"
import { badRequestErrorHandler, notFoundErrorHandler, forbiddenErrorHandler, genericServerErrorHandler } from './library/errorHandlers.js'

//*************************************

const server = express()
const port = process.env.PORT || 3001

const whiteList = [process.env.FE_PROD_URL, process.env.FE_DEV_URL]

const corsOpts = {
  origin: function (origin, next) {
    console.log("THIS IS THE CURRENT ORIGIN: ", origin)

    if(!origin|| whiteList.indexOf(origin) !== -1){
      // request is allowed if recieved origin is in the whiteList
      next(null, true) 
    } else {
      // if not request gets rejected
      next(new Error(`THIS ORIGIN ${origin} IS NOT ALLOWED`))
    }
}}

//---Global Middlewares---
server.use(cors(corsOpts))    
server.use(express.json())   

//---Endpoints---

server.use("/media", mediaRouter)








console.table(listEndpoints(server))


server.listen(port, () => {
  console.log("SERVER RUNNING ON PORT", port)
})