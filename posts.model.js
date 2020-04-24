const { Schema, model}= require("mongoose");

const blogPostsSchema=new Schema({

    Blog:String,
    Author:String,
});
 module.exports= model("posts",blogPostsSchema);