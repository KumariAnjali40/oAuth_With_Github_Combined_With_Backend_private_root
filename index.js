const express=require('express');
const mongoose=require('mongoose');
const {connection}=require('./db');
const {userRouter}=require('./routes/user.routes');
const {UserModel}=require('./models/user.models');
const {auth}=require('./middleware/auth.middleware');
// const {access}=require('./middleware/access.middleware');
const jwt=require('jsonwebtoken');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app=express();

app.use(express.json());

app.use('/user',userRouter);

app.get('/list',auth,(req,res)=>{
    res.send("APi is working")
})

// app.get( "/all",auth),
//     async (req, res) => {
//       try {
//         const user = await UserModel.find(req.query);
//         res.status(200).json({ users_list: user });
//       } catch (err) {
//         res.json({ error: err });
//         console.log(err);
//       }
//  };


app.get('/login',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get('/auth/github',async(req,res)=>{
    const {code}=req.query;
   const token_response= await fetch("https://github.com/login/oauth/access_token",{
        method:"POST",
        headers:{
          Accept:"application/json",
        "content-type":"application/json"
        },
        body:JSON.stringify({
            client_id:"569552e629edec48f4ce",
            client_secret:"ff83e3af89d2d251e3710c99143f89ed8dcad3ae",
            code:code
        })
    })
    .then((res)=>res.json())
    console.log(token_response);
    const access_token=token_response.access_token
    // res.send("code is:"+code);

    const githubUserResponse =await fetch("https://api.github.com/user",{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    })
    const githubUser = await githubUserResponse.json();
    console.log(githubUser);

    // const userId = String(githubUser.id);
    const user = await UserModel.findOneAndUpdate(
        { name: githubUser.login },
        {
            $set: {
                name: githubUser.login,
                image:githubUser.avatar_url,
            },
        },
        { upsert: true, new: true }
    );

    console.log(user);

    const token = jwt.sign({ userID: user._id }, "Anjali");

    // res.json({ token });
    console.log(token);
    res.send(token);
    
   
});





app.listen(8000,async()=>{
    try{
       await connection,
       console.log("connected to db");
       console.log("Server is running at port 8000");
    
    }
    catch(err){
        console.log(err);
    }
    
})