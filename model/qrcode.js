const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QRCodeSchema = new Schema({
    name: { type: String, required: true },
    number: { type:String , required: true },
    waitingTime: { type:Number , required: true },
    code : {type:String, required:true},
    createdAt: {
      type: Date,
      default: Date.now,
    },
});
//const QRCode = mongoose.model("qrcode", QRCodeSchema);
module.exports = QRCode = mongoose.model("qrcode", QRCodeSchema);

//module.exports mongoose.model("qrcode", QRCodeSchema);