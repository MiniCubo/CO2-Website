const express = require("express");
const https = require("https");
const fs = require("fs");
const csv = require("fast-csv");

const app = express();

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.route("/")
.get((req, res)=>{
    res.render("index", {title: "Carbon Bank"});
});

app.route("/co2")
.get((req, res)=>{
    res.render("real-time-CO2", {title:"CO2 Emmisions"});
});

app.use("/timelapse", (req, res, next)=>{
    req.customdata = []
    const readable = fs.createReadStream(__dirname + "/public/datos/timelapsedata.csv").pipe(csv.parse({}));
    readable.on("data", (data)=>{
        req.customdata.push(data);
    })
    .on("end", ()=>{
        next();
    });
});

app.route("/timelapse")
.get((req, res)=>{
    var info = req.customdata;
    res.render("timelapse", {title:"CO2 Emmisions", info});
});

app.listen(3000, ()=>{
    console.log("Listening to port 3000");
});