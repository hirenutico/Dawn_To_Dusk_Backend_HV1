const express = require('express');
const router = express.Router();
const MenuService = require('./MenuService.js');
const {checkMobileAuth} = require('../../middlewares/auth')
router.post('/addproduct', checkMobileAuth, addproduct)
module.exports = router;

function addproduct(req, res, next){
    if(!req.body.foodname){
        res.status(400).send({status:false, message:"itemName address not found!"})
    }
    console.log(`Server listening on port ${req.body}`);
    MenuService.addproduct(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Data is incorrect' }))
    .catch(err => next(err));
}
