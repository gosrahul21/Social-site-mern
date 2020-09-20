const express = require('express');
const path = require('path');
const app = express();


const connectDB = require('./config/db');
const routeUser = require('./routes/api/user');
app.use(express.json({extended:false}))

app.use('/api/users',routeUser);
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/post',require('./routes/api/post'));
 app.use('/api/auth',require('./routes/api/auth'));

//serve static assets in production

if(process.env.NODE_ENV==='production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
const PORT= process.env.PORT||4000;

app.listen(PORT,()=>{
    console.log("app successfuly established at port")
});