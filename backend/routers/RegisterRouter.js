import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Registration from '../models/RegistrationModal.js';


const RegisterRouter = express.Router();

RegisterRouter.post('/', expressAsyncHandler(async (req, res) => {
    const register = new Registration(req.body);
    const registeredUser = await register.save();

    res.send(registeredUser);

}));

export default RegisterRouter;