import { Schema } from 'mongoose'
import mongoose from 'mongoose'

const User = mongoose.model('User',
    new Schema ({
        usuario: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        }
    })
)

export default User