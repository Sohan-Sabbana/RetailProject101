const Vendor = require('../models/Vender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.JWT;

const VendorRegister = async(req,res)=>{
    const {username,email,password} = req.body;
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("email already exists");
        }
        const hashpassword = await bcrypt.hashSync(password,10);
        console.log(hashpassword);
        const newVendor=new Vendor({
            usernmae:username,
            email:email,
            password:hashpassword
        });
        await newVendor.save();
        res.status(201).json({message:"Vendor created"});
    }
    catch(err){
        console.log(err);
        rea.status(500).josn({err:"internal server error"});
    }
}

const vendorLogin = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const vendor = await Vendor.findOne({email});
        if(!vendor||!(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error: "Invalid username or password" });
        }
        const vendorId=vendor._id;
        const token = jwt.sign({vendorId: vendor._id},secretKey, {expiresIn: "24h"});
        res.status(200).json({success: "Login successful",token,vendorId});


    } catch (error) {
        console.log(error);
        res.status(500).json({err:"Internal server error"});
    }
}

const getVendorById = async(req,res)=>{
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error: "Vendor not found"});

            
        }
        if (!vendor.firm || vendor.firm.length === 0) {
          const  vendorFirmId=0;
            return res.status(404).json({ error: "No firm associated with this vendor", vendorFirmId});
        }
      const vendorFirmId = vendor.firm[0]._id;
       res.status(200).json({vendorId,vendorFirmId,vendor});
       
    } catch (error) {
        console.log(error);
        res.status(500).json({err: "intrenal server error"});
    }
}

module.exports={VendorRegister,vendorLogin,getVendorById};