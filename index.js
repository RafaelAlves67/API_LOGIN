import express from 'express'
import cors from 'cors'
import db from './data/db.js'
import UsersRoutes from './routes/Routes.js'

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!")
})

app.use('/', UsersRoutes);



