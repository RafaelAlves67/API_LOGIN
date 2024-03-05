import express from 'express'
import { UserControllers } from '../controllers/UserControllers.js'

const routes = express.Router()

routes.get('/' , UserControllers.getUsers)
routes.post('/register' , UserControllers.registerUser)
routes.delete('/:id' , UserControllers.deleteUser)
routes.post('/login' , UserControllers.loginUser)

export default routes

