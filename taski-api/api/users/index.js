import express from 'express';
import User from './userModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Server error', error: error.message });
    }
});

// Register/Create/Authenticate User
router.post('/', async (req, res) => {
    try {
        if (req.query.action === 'register') {
            const newUser = new User(req.body);
            await newUser.save(); // Mongoose validation will be triggered here
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.',
            });
        } else { // Authenticate
            const user = await User.findOne({ username: req.body.username, password: req.body.password });
            if (!user) {
                return res.status(401).json({ code: 401, msg: 'Authentication failed' });
            } else {
                return res.status(200).json({ code: 200, msg: 'Authentication Successful', token: 'TEMPORARY_TOKEN' });
            }
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ code: 400, msg: error.message });
        }
        res.status(500).json({ code: 500, msg: 'Server error', error: error.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id;
        const result = await User.updateOne({ _id: req.params.id }, req.body);
        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'User updated successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to update user' });
        }
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Server error', error: error.message });
    }
});

export default router;
