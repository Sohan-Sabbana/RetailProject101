const Vendor = require('../models/Vender');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = async(req,res,next)=>{
    const token = req.headers.token;
    if(!token){
       return res.status(401).json({error: "Token is required"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT);
        const vendor = await Vendor.findById(decoded.vendorId);
        if(!vendor){
            return res.status(404).json({error: "vendor not found"});
        }
        req.vendorId = vendor._id;
        next();
    }
    catch(err){
        console.log(err);
        return res.json(500).json({error: "Invalid token"});
    }
}

module.exports = verifyToken;