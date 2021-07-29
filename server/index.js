/**
 * Este archivo contiene la configuración de express, toda la configuración del servidor vaya
 * algo así como apache
 * 
 */

// ---------- Esta es la sintaxis antigua commonJS -----------
// const express = require('express')

// ---------------- Nueva Sintaxis con import --------------------------
import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'

import dotenv from 'dotenv'
dotenv.config({ path: 'variables.env'})

const app = express()

// Concectar a la base de datos
db.authenticate()
    .then( () => {
        console.log('Base de datos conectada')
    })
    .catch(error => console.log(error))


// Habilitar PUG
app.set('view engine', 'pug')

//  (middleware)
app.use( (req, res, next) => {
    const year = new Date()

    res.locals.actualYear = year.getFullYear()
    res.locals.nombresitio = "Agencia de Viajes"
    return next()
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}))

// Definir la carpeta publica
app.use(express.static('public'))

// Agregar router
app.use('/', router) // use soporta GET, POST, PUT, PATCH, DELETE, todos los verbos http y a esa / agregamos router, por ejemplo /nosotros

// Puerto y host para la app
const host = process.env.HOST || '0.0.0.0'
// Definir puerto
const port = process.env.PORT || 4000 // En un servidor al hacer deployment se selecciona un puerto automaticamente, en caso de que no se pueda, selecciona el puerto 4000



app.listen(port, host, () => {
    console.log('El servidor está funcionando')
})
