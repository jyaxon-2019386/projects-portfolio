'use strict'

import Student from './student.model.js'
import Course from '../course/course.model.js'
import { jwtDecode } from 'jwt-decode'
import { encrypt, checkPassword, checkUpdate} from '../utils/validator.js' 
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        // data.courses = []; // Inicializar courses como un arreglo vacío
        data.role = 'STUDENT_ROLE'
        let student = new Student(data)
        await student.save()
        return res.send({message: `Registered successfully, can be logged with ${student.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering student!', err: err})
    }
}

export const login = async(req, res) =>{
    try{
        let { username, email, password } = req.body
        let student = await Student.findOne({ $or: [{ username: username }, { email: email }] });
        if(student && checkPassword(password, student.password)){
            let loggedStudent = {
                uid: student._id,
                username: student.username,
                name: student.name,
                role: student.role
            }
            // Generar el token
            let token = await generateJwt(loggedStudent)
            // Respode el usuario 
            return res.send({
                message: `Welcome, ${loggedStudent.name}`, 
                token,
                loggedStudent
            })   
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const assignedCourses = async (req, res) => {
    try {
        // Obtener el ID del estudiante y del curso al que se asignará
        const { studentId, courseId } = req.body;

        // Validar los IDs del estudiante y del curso
        if (!studentId || !courseId) {
            return res.status(400).send({ message: 'Invalid studentId or courseId' });
        }

        // Buscar el estudiante y el curso en las colecciones correspondientes
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) {
            return res.status(404).send({ message: 'Student or course not found' });
        }

        // Verificar si el estudiante ya está asignado al curso
        if (student.courses.includes(courseId)) {
            return res.status(400).send({ message: 'Student is already assigned to this course' });
        }

        // Verificar si el estudiante ha alcanzado el límite de 3 cursos
        if (student.courses.length >= 3) {
            return res.status(400).send({ message: 'Student has reached the limit of 3 courses' });
        }

        // Asignar al estudiante el curso
        student.courses.push(courseId);
        await student.save();

        return res.status(201).send({ message: 'Student assigned to course successfully!', student });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error assigning student to course' });
    }
}

export const viewAssignedCourses = async (req, res) => {
    try {
        // Obtener el ID del estudiante
        const { id } = req.params;

        // Validar el ID del estudiante
        if (!id) {
            return res.status(400).send({ message: 'Invalid studentId' });
        }

        // Verificar si el token del propietario coincide con el token en la solicitud
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token del header Authorization
        if (token !== req.user.token) { // Asegurarse de tener una propiedad "token" en el objeto user
            return res.status(403).send({ message: 'Unauthorized' });
        }

        // Buscar al estudiante en la colección correspondiente
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }

        // Obtener los cursos asignados al estudiante
        const assignedCourses = student.courses;

        return res.status(200).send({ assignedCourses });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error retrieving assigned courses' });
    }
};

 
// Update a profile
export const update = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        let { id } = req.params
        //Validar que vengan datos
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        //Actualizar
    let updatedProfile = await Student.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
        )
        //Validar la actualización
        if(!updatedProfile) return res.status(404).send({message: 'Course not found and not updated'})
        //Responder si todo sale bien
        return res.send({message: 'Profile updated successfully!', updatedProfile})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating profile!' })
    } 
}

//Delete profile
export const deleteP = async(req, res)=>{
    try{
        let { id } = req.params
        //Eliminar
        let deletedProfile = await Student.deleteOne({_id: id})
        //Validar que se eliminó
        if(deletedProfile.deletedCount === 0) return res.status(404).send({message: 'profile not found and not deleted'})
        //Responder
        return res.send({message: 'Deleted profile successfully'})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error deleting profile'})
    }
}


