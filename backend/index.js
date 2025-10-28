import express from 'express'; 
import cors from 'cors'; 
import authRoutes from './routes/authRoute.js'
import transactionRoute from './routes/transactionRoute.js'
import connectDb from './config/db.js';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
app.use(cors());
import cors from "cors";
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
await connectDb();
app.use('/api/auth',authRoutes);
app.use('/api/transaction',transactionRoute);
app.get('/',(req,res)=>{
    res.json({message:'running'});
})


const port = 8000;
app.listen(port,()=>{
   console.log(`server running on ${port}`);
})