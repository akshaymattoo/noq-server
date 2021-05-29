const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const cors = require('cors');

const QRCode= require("./model/qrcode");

const app = express();

app.set("trust proxy", 1);

// connect to Mongo
mongoose
  .connect("mongodb://localhost:27017/noq", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Succesfully connected to db");
  })
  .catch((err) => console.log(err));

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

// Fetch the specific code from db
app.get("/api/qrcodes/:code", async (req, res) => {
  try{
    const code = req.params.code;
    let data = await QRCode.findOne({ code: code });
    if(data)
      res.status(200).json(data);
    else
    res.status(404).json(data);
  }catch(err)  {
    res.status(500).send(err);
  }
});

// Add an entry in DB
app.post("/api/qrcodes", (req, res) => {
    const body = req.body;
    const qrcode = new QRCode(
        { 
            name: body.name,
            number:body.number,
            waitingTime:body.waitingTime,
            code:makeid(6) ,
            createdAt:new Date().toUTCString()
        }
    );
    qrcode.save(function (err,data) {
        if (err){ 
            console.error(err);
            return res.send(err);
        }
        console.log("Saved in db ",data)
        res.json({success:true})
    });
});

// generated a 6 digit code.
function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
        charactersLength)));
   }
   return result.join('');
}

const port = 80;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
