import { Application } from "express"
import express from 'express'
// import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { corsOptions } from '../configs/cors.config'


module.exports = (app: Application) => {
    // middlewwares

    // app.options('*', cors())
    // app.use(cors())
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false })) // parses form submissions to be able to access body
    app.use(express.json()) // parses json
    // app.use(morgan('combined')) // logs every request
    app.use(helmet()) // additional security layer by auto setting some important headers
    app.disable('x-powered-by') // remove powered by express header for security purposes
}