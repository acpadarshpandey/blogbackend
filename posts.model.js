const { Schema, model}= require("mongoose");

const blogPostsSchema=new Schema({
    name:String,
    password:String,
    blog:String,
});
 module.exports= model("posts",blogPostsSchema);