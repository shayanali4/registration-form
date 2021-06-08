import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import RegisterRouter from './routers/RegisterRouter.js';
import emailRouter from './routers/emailRouter.js';

dotenv.config();

const app = express(); 

app.use(cors()) // Use this after the variable declaration

app.use(express.json({limit: 2000000}));
app.use(express.urlencoded({limit: 2000000, extended: false}));

mongoose.connect('mongodb+srv://admin:admin123@cluster0.gwgp8.mongodb.net/RegistrationForm?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(
    console.log("MongoDB Connected")
).catch((err) => {
    console.log("mongo error",err)
});

app.use('/api/email', emailRouter);
app.use('/api/register', RegisterRouter);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next)=> {
    res.status(500).send({message:err.message});
});

const port = process.env.PORT || 5080; 

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});