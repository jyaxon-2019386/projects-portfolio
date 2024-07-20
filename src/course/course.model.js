import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true
       },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true 
        }
    ],
   
},{
    versionKey: false
 }
)

export default mongoose.model('course', courseSchema);

