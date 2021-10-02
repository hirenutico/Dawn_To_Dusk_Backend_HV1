const express = require('express');
const router = express.Router();
const CategoriesService = require('./CategoriesService.js');
const {checkMobileAuth} = require('../../middlewares/auth')
router.post('/addcategory', checkMobileAuth, addcategory)
router.get('/getcategory', checkMobileAuth, getcategory)
router.delete('/deletecategory', checkMobileAuth, deletecategory)
router.delete('/deleteallcategory', checkMobileAuth, deleteallcategory)
module.exports = router;

function addcategory(req, res, next){
    if(!req.body.categoryname){
        res.status(400).send({status:false, message:"CategoryName not found!"})
    }
    console.log(`Server listening on port ${req.body}`);
    CategoriesService.addproduct(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Data is incorrect' }))
    .catch(err => next(err));
}

function getproduct(req, res, next){
    console.log(`Server listening on port ${req.body}`);
    CategoriesService.getproduct(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Data is incorrect' }))
    .catch(err => next(err));
}
