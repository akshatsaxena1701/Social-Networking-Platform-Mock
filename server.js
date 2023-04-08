const express=require('express')
const app=express()
const PORT=process.env.PORT || 4000
const connectDB=require("./config/db");
const path = require('path')
connectDB();

app.use(express.json({extended:false}));


app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/post',require('./routes/api/post'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})