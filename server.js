const express=require('express')
const app=express()
const PORT=process.env.PORT || 4000
const connectDB=require("./config/db");
connectDB();

app.use(express.json({extended:false}));


app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/post',require('./routes/api/post'));

app.get('/',(req,res)=>{
    res.send("Server is running");
})

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})