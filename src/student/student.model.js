import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: false, // Quitamos la restricción de unicidad en el campo username
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        uppercase: true,
        required: true,
        enum: ['TEACHER_ROLE', 'STUDENT_ROLE'],
    },
    courses:[
        {    
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        }
    ]
},{
    versionKey: false 
})

export default mongoose.model('student', studentSchema);

