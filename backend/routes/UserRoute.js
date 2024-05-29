import express from 'express';
import { User } from '../modules/UserModel.js';

    const UserRoute = express.Router(); // Użytkownik
    
    UserRoute.post('/', async (req, res) => {
        try {
            if ( !req.body.username || !req.body.password || !req.body.email ) {
                return res.status(400).send({message: "Send all required fields."});
            }
        
            const newUser = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                favourites: [],
                cart: []
            }
        
            const user = await User.create(newUser);
        
            return res.status(201).send(user);
        
        } catch (error) {
            console.error(error);
            res.status(500).send({message: error.message});
        }
    });

    UserRoute.get('/', async (req, res) => {
        try {
            const users = await User.find();
    
            return res.status(200).json({
                count: users.length,
                data: users,
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).send({ message: error.message })
        }
    });
    
    UserRoute.get('/:id', async (req, res) => {
        try {
    
            const { id } = req.params;
    
            const user = await User.findById(id);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
    
            return res.status(200).json(user);
        } catch (error) {
            console.error(error.message);
            return res.status(500).send({ message: error.message })
        }
    });

    UserRoute.put('/:id', async (req, res) => {
        try {
            if ( !req.body.favourites || !req.body.cart ) {
                return res.status(400).send({message: "Send all required fields."});
            }
            
            const { id } = req.params;
    
            const result = await User.findByIdAndUpdate(id, req.body);
    
            if (!result) {
                return res.status(404).json({ message: 'User not found.' });
            }
    
            return res.status(200).json({ message: 'User updated successfully.' });
    
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: error.message });
        }
    });

    export default UserRoute;