const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const musics = require('./routes/routes')

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())



const port = process.env.PORT || 8000;

app.use('/api', musics)

app.listen(port, ()=> {
    console.log('El Servidor está corriendo en el puerto 8000')
})
