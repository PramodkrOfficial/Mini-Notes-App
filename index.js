const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));       //iski jagah per pura path aayega
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        // console.log(files);
        res.render("index", {files: files});
    })
})
app.get("/file/:filename", function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
        res.render("show", {filename: req.params.filename, filedata: filedata});
        // console.log(filedata);
    })
})

app.post("/create", function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
            res.redirect("/")
        })
        
        // console.log(req.body);
        // res.render("index", {files: files});
    })
})

// app.get("/profile/:username", function (req, res) {
//     res.send(`welcome, ${req.params.username}`);
//     // res.send("it is profile page and server running...");
// })

// app.get("/profile/:username/:age", function (req, res) {
//     res.send(`welcome, ${req.params.username} of age ${req.params.age}`);
    
// })

// app.get("/profile/:username/:age/:role/", function (req, res) {
//     res.send(`welcome, ${req.params.username} of age ${req.params.age} as role ${req.params.role}`);

// })


app.listen(3000, function () {
    console.log("server running...");
});

// app.listen(4000, function () {
//     console.log("server running...");
// });











// const path = require('path');
// console.log(path.join(__dirname, 'public'))

// console.log(__dirname + '/public');
