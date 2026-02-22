import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './conifg/db';
import helperRoutes from './routes/helperRoutes';
import { errorHandler } from './middlewares/errorHandler';


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


//Router Specific Routes
app.use('/api', helperRoutes);
// Routes
app.get('/', (_req, res) => {
  res.send('API is running...');
});

app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
