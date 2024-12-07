import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Regular expression for password validation
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Path `username` is required.'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Path `password` is required.'],
        validate: {
            validator: (value) => passwordRegex.test(value),
            message:
                'Password must be at least 8 characters long, contain at least one letter, one digit, and one special character.',
        },
    },
});

export default mongoose.model('User', UserSchema);
