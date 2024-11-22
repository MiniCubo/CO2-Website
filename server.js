const express = require("express");
const fs = require("fs");
const data = require("./datos/datos");
const geojson = require("./datos/mexicoHigh.json");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/datos", (req, res)=>{
    res.send(data);
});

app.get("/geojson", (req, res)=>{
    res.send(geojson);
})

app.listen(PORT, ()=>{
    console.log(`Port: ${PORT}`);
});