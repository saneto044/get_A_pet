require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT
const app = express();

//config json 
app.use(express.json());

app.use(cors({ credentials:true,origin:'http://localhost:3000'}))
//Database
require('./db/conn')

//Public folder for images
app.use(express.static('public'))

//Routes
const UserRoutes = require('./Routes/UserRouter')
const PetRoutes = require('./Routes/PetRouter')
app.use('/users', UserRoutes)
app.use('/pets',PetRoutes)

app.listen(port,() => console.log('conectado na porta:' + port))