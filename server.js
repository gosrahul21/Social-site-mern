const express = require('express');

const app = express();

const PORT= process.env.PORT||4000;
const connectDB = require('./config/db');
const routeUser = require('./routes/api/user');
app.use(express.json({extended:false}))

app.use('/api/users',routeUser);
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/post',require('./routes/api/post'));
 app.use('/api/auth',require('./routes/api/auth'));


app.get('/',(req,res)=>{
    res.status(201).send('<h1>HELLO WORLD</h1>')
});



app.listen(PORT,()=>{
    console.log("app successfuly established at port")
});