const express=require("express");
const dotenv=require('dotenv');
const connectDB=require('./config/db.js');
const authRoutes = require("./routes/authRoutes.js");
const protect = require("./middleware/authMiddleware");

dotenv.config();
connectDB();


const app=express();

app.use(express.json());
app.use("/api/auth", authRoutes);



app.get('/',(req,res)=>{
    res.send("AI contract analyzer API runinng")
})
const port=process.env.PORT || 3000;
app.get("/api/test", protect, (req,res)=>{
    res.json({
        message:"Protected route working",
        user:req.user
    });
});


app.listen(port,()=>{
    console.log(`server is runinng on ${port}`);
    
});