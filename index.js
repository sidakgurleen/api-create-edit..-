const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4: uuidv4}=require("uuid");

const methodOverride = require('method-override')

 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
//uuidv4();
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {
        id:uuidv4(),
        username:"Gurleen kaur",
        content:"i love coding!",
    },
    {
        id:uuidv4(),
        username:"Shardha",
        content:"hardwork is key to success!",
    },
    {
        id:uuidv4(),
        username:"Sidak",
        content:"i am ready to do anything to achieve my goal!",
    },
    {
        id:uuidv4(),
        username:"Harkirat singh",
        content:"believe in yourself ,you can do it",
    },
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
     console.log(id);
    res.render("show.ejs",{post});
   // res.send("request working");
})
app.patch("/posts/:id",(req,res) =>{
    
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
     post.content=newContent;
    console.log(post);
    res.redirect("/posts");
    res.send("patch request working");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
     res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("listening to port :8080");
});
