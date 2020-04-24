const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const blogPosts= require("./posts.model");
const PORT = process.env.PORT || 4000;
const User=require('./model/user.model')

 app.use(bodyParser.json());
 app.use(cors());
 app.use(bodyParser.urlencoded({
     extended: true,
 })
 );

mongoose.connect("mongodb+srv://apptodo:databaseoftodo@cluster0-r1zra.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});

   

app.get('/', (req, res) => {
    blogPosts.find({}).exec((err,BlogList)=>{
        if(err) console.log(err);
        else{
            res.send({BlogList:BlogList});
        }
    });
});

app.post('/signup',(req,res)=>{
    
    const user = new User({
        email:req.body.email,
        password:req.body.password
    }).save((err,response)=>{
        if(err) res.status(400).send(err)
        res.status(200).send(response)
    })
     });


// app.post('/signin',function(req,res){

//     User.findOne({email:req.body.email},(err,document)=>{
//         if(err) console.log(err)
//         else{
//             if(document.password === req.body.password){
//                 res.send({status:"success"});
//             }else{
//                 res.send({status:"password incorrect"});
//             }
//         }
//     });
// });
app.post("/createBlog",(req,res) =>{

        const Post= new blogPosts(req.body);
    
        // const{Author, Blog}= req.body;
    
        // Post.Author=Author;
        // Post.Blog=Blog;
        
    
        Post.save((err,BlogList) =>{
              if(err) return res.send("ERROR");
    
     return res.json(BlogList);
        });
    });
app.post('/updateBlog',(req,res)=>{
    blogPosts.findOneAndUpdate(
        {Author:req.body.Author},
        {$set:{blog:req.body.Blog}})
    .then(res=>{
        console.log("updated successfully");
    })
    .catch(err=>{
        res.json({
            err:`${err}`
        });
    });
});

app.post('/blogDelete',(req,res)=>{
    blogPosts.findByIdAndRemove({_id:req.body.id},err=>{
        if(err){
             console.log(err)
        }
    })
    res.redirect('/');
})

/ app.listen(PORT, () => {
         console.info(`App is running at ${PORT}`);
     }); 


























     

// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const blogPosts= require("./posts.model");
// const PORT = process.env.PORT || 3000;
// const User=require('./model/user.model')

//  app.use(bodyParser.json());
//  app.use(bodyParser.urlencoded({
//      extended: true,
//  })
//  );

// mongoose.connect("mongodb+srv://apptodo:databaseoftodo@cluster0-r1zra.mongodb.net/test?retryWrites=true&w=majority",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//     useCreateIndex: true
// });

   

// app.get('/', (req, res) => {
//     blogPosts.find({}).exec((err,BlogList)=>{
//         if(err) console.log(err);
//         else{
//             res.send({BlogList:BlogList});
//         }
//     });
// });

// app.post('/signup',(req,res)=>{
    
//     const user = new User({
//         email:req.body.email,
//         password:req.body.password
//     }).save((err,response)=>{
//         if(err) res.status(400).send(err)
//         res.status(200).send(response)
//     })
//      });


// app.post('/signin',function(req,res){

//     User.findOne({email:req.body.email},(err,document)=>{
//         if(err) console.log(err)
//         else{
//             if(document.password === req.body.password){
//                 res.send({status:"success"});
//             }else{
//                 res.send({status:"password incorrect"});
//             }
//         }
//     });
// });
// app.post("/createBlog",(req,res) =>{

//         const Post= new blogPosts();
    
//         const{Author,userAuthor,password, blog}= req.body;
    
//         Post.Author=Author;
//         Post.blog=blog; 
//         Post.author=email;
//         User.findOne({email:req.body.email},(err,document)=>{
//             if(document.password === req.body.password)
//           Post.save((err,BlogList,) =>{
//               if(err) return res.send("ERROR");
//           return res.json(BlogList);
//         });
//     });
// app.post('/updateBlog',(req,res)=>{
//     blogPosts.findOneAndUpdate(
//         {Author:req.body.Author},
//         {author:req.body.userAuthor},
//         {$set:{blog:req.body.blog}},(err,document)=>
//         {if(document.userAuthor===req.body.password) 
//         console.log("updated successfully");
    
//     .catch(err=>{
//         res.json({
//             err:`${err}`
//         })
//     })
// });

// app.post('/blogDelete',(req,res)=>{
//     blogPosts.findByIdAndRemove({_id:req.body.id},{author:req.body.userAuthor},err=>{
//         if(err){
//              console.log(err)
//         }
//     })
//     res.redirect('/');
// })

//  app.listen(PORT, () => {
//          console.info(`App is running at ${PORT}`);
//      });
     






// const app =require("express")();
// const bodyParser=require("body-parser");
// const { connect }= require("mongoose");
// const blogPosts= require("./posts.model");

// const PORT=process.env.PORT|| 4000;

// const DB_URI =
//  ("mongodb+srv://apptodo:databaseoftodo@cluster0-r1zra.mongodb.net/test?retryWrites=true&w=majority/blogger",{
//     useNewUrlParser: true,
//     useUnifiedTopology:true,
//     useFindAndModify:false,
// });

//  app.use(bodyParser.json());
//  app.use(bodyParser.urlencoded({
//      extended: true,
//  })
//  );

 
// app.get('/', (req, res) => {
//     blogPosts.find({},(err,List)=>{
//         if(err) console.log(err);
//         else{
//             res.send({List:List});
//         }
//     });
// });


// // app.get("/posts",(req,res) =>{
// //     blogPosts.find().exec((err,posts) =>{
// //         if(err) return res.send("ERROR");
// //         return res.json(Post);
// //     } );
// // });


// app.post('/signup',(req,res)=>{
    
//     const Post = new blogPosts({
//         Author:req.body.Author,
//         password:req.body.password
//     });
//     blogPosts.create(Post,function(err,blogPosts){
//         if(err) console.log(err)
//         else{
//             console.log('item is added');
//             res.send({Post})
//         }
//     })
//     res.send({status:"success"});
// });

// app.post('/login',function(req,res){

//     blogPosts.findOne({Author:req.body.Author},(err,document)=>{
//         if(err) console.log(err)
//         else{
//             if(document.password === req.body.password){
//                 res.send({status:"success"});
//             }else{
//                 res.send({status:"wrong password"});
//             }
//         }
//     });
// });




// app.post('/update-Blog',(req,res)=>{
//     blogPost.findOneAndUpdate(
//         {Author:req.body.Author},
//         {$set:{blog:req.body.blog}})
//     .then(res=>{
//         console.log("updated successfully");
//     })
//     .catch(err=>{
//         res.json({
//             err:`${err}`
//         });
//     });
// });


// app.post('/blog-Delete',(req,res)=>{
//     blogPost.findByIdAndRemove({_id:req.body.id},err=>{
//         if(err){
//              console.log(err)
//         }
//     })
//     res.redirect('/');
// })



// app.listen(PORT, () => {
//     console.info(`App is running at ${PORT}`);
// }); 



// 
///other apis

//app.get("/",(req,res) =>{
    //     res.send("Happy TO COnnect")

// app.post("/post-complete",(req,res) =>{
// Posts.create(req.body,(err,post) =>{
//           if(err) return res.send("ERROR");

//  return res.json(post);
//     });
// });

// app.delete("/delete-post:id",(req,res) =>{
//     Posts.findOneAndDelete({_id:req.param.id},).exec((err,post) =>{
//         if(err) return res.send("ERROR");
//         return res.json(post);
//     } );
// });

// app.put("/update-post:id",(req,res) =>{
//     Posts.findOneAndUpdate({_id:req.param.id}, { $set:{title:req.body.title}} ,{upsert:true}
        
//     ).exec((err,post) =>{
//         if(err) return res.send("ERROR");
//         return res.json(post);
//     } );
// });
// app.post("/post",(req,res) =>{

//     const Post= new Posts();

//     const{title, body}= req.body;

//     Post.title=title;
//     Post.body=body;

//     Post.save((err,post) =>{
//           if(err) return res.send("ERROR");

//  return res.json(post);
//     });
// });

// app.get("/post:id",(req,res) =>{
//     blogPosts.findone({_id:req.param.id}).exec((err,post) =>{
//         if(err) return res.send("ERROR");
//     } );
// });
