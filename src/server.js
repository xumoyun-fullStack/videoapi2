const fs = require("fs");
const path = require("path");

const { PORT } = require("../config");
const express = require("express");
const app = express()

//middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes

fs.readdir(path.join(__dirname, "routes"), (err, files) => {
  
    if(!err){
        files.forEach(file => {
            let routePath = path.join(__dirname, "routes", file );
            const Route = require(routePath);
            
            if(Route.path && Route.router) app.use(Route.path, Route.router)
        });
    }
})


app.listen(PORT, _ => {
    console.log(`Server at http://localhost:${PORT}`)
})