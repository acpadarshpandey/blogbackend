const app =require("express")();
const bodyParser=require("body-parser");
const { connect }= require("mongoose");
const blogPosts= require("./posts.model");

const PORT=4000;

const DB_URI =
 ("mongodb+srv://apptodo:databaseoftodo@cluster0-r1zra.mongodb.net/test?retryWrites=true&w=majority/blogger",{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
});

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true,
 })
 );

app.get("/",(req,res) =>{
    blogPosts.find().exec((err,posts) =>{
        if(err) return res.send("ERROR");
        return res.json(posts);
    } );
});


app.post('/signup',(req,res)=>{
    
    const Post = new blogPosts({
        name:req.body.name,
        password:req.body.password
    });
    blogPosts.create(Post,function(err,blogPosts){
        if(err) console.log(err)
        else{
            console.log('item is added');
        }
    })
    res.send({status:"success"});
});

app.post('/login',function(req,res){

    blogPosts.findOne({name:req.body.name},(err,document)=>{
        if(err) console.log(err)
        else{
            if(document.password === req.body.password){
                res.send({status:"success"});
            }else{
                res.send({status:"wrong password"});
            }
        }
    });
});




app.post('/update-Blog',(req,res)=>{
    blogPost.findOneAndUpdate(
        {name:req.body.name},
        {$set:{blog:req.body.blog}})
    .then(res=>{
        console.log("updated successfully");
    })
    .catch(err=>{
        res.json({
            err:`${err}`
        });
    });
});


app.post('/blog-Delete',(req,res)=>{
    blogPost.findByIdAndRemove({_id:req.body.id},err=>{
        if(err){
             console.log(err)
        }
    })
    res.redirect('/');
})



app.listen(PORT, () => {
    console.info(`App is running at ${PORT}`);
}); 



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
