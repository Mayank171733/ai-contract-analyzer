const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors=require('cors')
const path = require('path');

const connectDB = require('./config/db.js');
const authRoutes = require("./routes/authRoutes.js");
const protect = require("./middleware/authMiddleware");
const contractRoutes = require("./routes/contractRoutes");
const analysisRoutes = require("./routes/analysisRoutes");

connectDB();


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/auth", authRoutes);
app.use(
    "/api/contracts",
    contractRoutes
);
app.use(
    "/api/analysis",
    analysisRoutes
);



app.get('/', (req, res) => {
    res.send("AI contract analyzer API runinng")
})
const port = process.env.PORT || 3000;
app.get("/api/test", protect, (req, res) => {
    res.json({
        message: "Protected route working",
        user: req.user
    });
});


app.listen(port, () => {
    console.log(`server is runinng on ${port}`);

});