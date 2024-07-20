'use strict'

import Teacher from './teacher.model.js'
import Course from '../course/course.model.js'
import Student from '../student/student.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'
import { jwtDecode } from 'jwt-decode'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}
// Función para crear un profesor por defecto
const createDefaultTeacher = async (req, res) => {
    try {
        const createTeacher = await Teacher.findOne();

        if (!createTeacher) {
            const hashedPassword = await bcrypt.hash('password', 10);
            const teacher = new Teacher({
                name: 'defaultTeacher',
                surname: 'default',
                username: 'dfault',
                password: hashedPassword,
                email: 'teacherDefault@example.com',
                versionKey: false
            });
            await teacher.save();
            console.log('Default teacher created:', teacher);
        }
    } catch (err) {
        console.error(err);
    }
}

createDefaultTeacher();  

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'TEACHER_ROLE'
        let teacher = new Teacher(data)
        await teacher.save()
        return res.send({ message: `Registered successfully, can be logged with ${teacher.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering teacher!', err: err })
    }
}

export const login = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        let teacher = await Teacher.findOne({ $or: [{ username: username }, { email: email }] });
        if (teacher && checkPassword(password, teacher.password)) {
            let loggedTeacher = {
                uid: teacher._id,
                username: teacher.username,
                name: teacher.name,
                role: teacher.role
            }
            // Generar el token
            let token = await generateJwt(loggedTeacher)
            // Respode el usuario 
            return res.send({
                message: `Welcome, ${loggedTeacher.name}`,
                token,
                loggedTeacher
            })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to login' })
    }
}

// Save a course
export const saveCourse = async(req, res)=>{
    try{
        let data = req.body
        let token = jwtDecode(req.headers.authorization)
        data.teacherId = token.uid
        let course = new Course(data)
        await course.save()
        return res.send({message: `Registered successfully ${course.name}!`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering course!', err: err})
    }
}

export const getCoursesByTeacherId = async (req, res) => {
    try {
        const { teacherId } = req.params;

        if (!teacherId) {
            return res.status(400).send({ message: 'Invalid teacherId' });
        }

        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {
            return res.status(404).send({ message: 'Teacher not found' });
        }

        const courses = teacher.courses;

        return res.status(200).send({ courses });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error retrieving courses' });
    }
};


// Update a course
export const update = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        let token = jwtDecode(req.headers.authorization)
        data.teacherId = token.uid
        let { id } = req.params
        //Validar que vengan datos
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        //Actualizar
        let updatedCourse = await Course.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        //Validar la actualización
        if (!updatedCourse) return res.status(404).send({ message: 'Course not found and not updated' })
        //Responder si todo sale bien
        return res.send({ message: 'Course updated successfully!', updatedCourse })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating course!' })
    }
}

// Delete a course
export const deleteC = async (req, res) => {
    try {
      let { id } = req.params;
      let token = jwtDecode(req.headers.authorization);
  
      await Student.updateMany(
        { courses: id },
        { $pull: { courses: id } }
      );
  
      // Eliminar
      let deletedCourse = await Course.deleteOne({ _id: id });
  
      // Validar que se eliminó
      if (deletedCourse.deletedCount === 0)
        return res.status(404).send({ message: 'Course not found and not deleted' });
  
      // Responder
      return res.send({ message: 'Deleted course successfully' });
    } catch (err) {
      console.error(err);
      return res.status(404).send({ message: 'Error deleting course!' });
    }
  };
  
  // Function to get courses by teacher ID
  export const viewCourses = async (req, res) => {
    try {
        let token = req.headers.authorization
        let decodeToken = jwt.verify(token, process.env.SECRET_KEY)
        let id = decodeToken.id
        const courses = await Course.find({ teacher: id });
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: 'No courses found for this teacher.' });
        }
        res.status(200).send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error.' });
    }
}
  

