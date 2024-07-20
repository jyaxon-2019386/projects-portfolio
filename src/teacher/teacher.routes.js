import express from 'express'
import { login, register, test, getCoursesByTeacherId, saveCourse, update, deleteC, viewCourses } from './teacher.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.get('/test', test)
api.post('/register', register)
api.post('/saveCourse', saveCourse)
api.post('/login', login)
api.get('/getCoursesByTeacherId/:teacherId', getCoursesByTeacherId)
api.get('/viewCourses/:id', [validateJwt],viewCourses)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteC)

export default api