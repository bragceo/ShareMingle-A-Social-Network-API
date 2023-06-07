import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/api/users.js';
import thoughtsRoutes from './routes/api/thoughts.js';
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtsRoutes);


app.listen(port, () => console.log(`Server started on port ${port}`));