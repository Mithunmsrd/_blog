const express = require('express');
const path = require('path');
const app = express();
const mongoose=require('mongoose');
const sample=require('./model/blog.js')
const dotenv=require('dotenv');
dotenv.config();

const uri = process.env.mongodb_uri;

mongoose.connect(
    uri // using .env
);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});



app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

// const blogPosts = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'))
})

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'))
})

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'))
})

app.get('/viewallblogs', (req, res) => {
    res.send(blogPosts)
})

app.get('/blog/:id', (req,res) => {
    // const id = req.params.id;
    // const blogs = blogPosts.find((blog) => blog.BlogID == id);
    // if (!blogs) {
    //   return res.status(404).send("Blog not found");
    // }
  
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
})

app.get('/api/blog/:id', async (req,res) => {
    const id= req.params.id;
    const details= await sample.findOne({BlogID: id})
    console.log(details);
    res.json(details);
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
})

app.post('/blog', async (req,res) => {
    try{
        const data=req.body;
        console.log(data)
        const details= await sample.create(data);
        res.status(201).redirect('/');
    
       }
    catch(error){
    res.status(500).json
    }
})

app.listen(3002, () => {
    console.log("The server is starting")
})