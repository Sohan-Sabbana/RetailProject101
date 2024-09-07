const express = require('express');
const router = express.Router();
const firmController = require('../controllers/firmcontroller');
const verifyToken = require('../middleware/verifyToken');

router.post('/add-firm',verifyToken,firmController.addFirm);
router.delete('/:firmId',firmController.deleteFirmById)
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));

})

module.exports = router;