const express=require("express");
const dotenv=require('dotenv');
const connectDB=require('./config/db.js');

dotenv.config();
connectDB();


const app=express();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("AI contract analyzer API runinng")
})
const port=process.env.PORT || 3000;


app.listen(port,()=>{
    console.log(`server is runinng on ${port}`);
    
});