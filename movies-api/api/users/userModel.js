import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

// Regular expression for password validation
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// Define the User schema
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

// Method to compare passwords
UserSchema.methods.comparePassword = async function (passw) {
    return await bcrypt.compare(passw, this.password);
};

// Static method to find a user by username
UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
};

// Pre-save hook to hash password
UserSchema.pre('save', async function (next) {
    const saltRounds = 10; // You can adjust the number of salt rounds
    if (this.isModified('password') || this.isNew) {
        try {
            const hash = await bcrypt.hash(this.password, saltRounds);
            this.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

export default mongoose.model('User', UserSchema);
