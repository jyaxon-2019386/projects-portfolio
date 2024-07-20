import express from 'express'
import { validateJwt }  from '../middlewares/validate-jwt.js';
import { login, register, test, assignedCourses, update, deleteP, viewAssignedCourses} from './student.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/register', register)
api.post('/login', login)
api.post('/assignedCourses', [validateJwt] ,assignedCourses)
api.get('/viewAssignedCourses/:id', [validateJwt], viewAssignedCourses)
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id',[validateJwt], deleteP)

export default api