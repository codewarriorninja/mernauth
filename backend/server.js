import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 8080;

const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

connectDB(MONGODB_URI);

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use('/api/users', userRoutes)
app.use(cors());

app.get('/', (req,res) => {
    res.status(201).json('Hello from server');
})

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})



