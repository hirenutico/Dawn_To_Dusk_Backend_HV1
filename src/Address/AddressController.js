const express = require('express');
const router = express.Router();
const AddressService = require('./AddressService.js');
const {checkMobileAuth} = require('../../middlewares/auth')
router.post('/addaddress', checkMobileAuth, addaddress)
router.post('/getaddress', checkMobileAuth, getaddress)
router.get('/getalladdress', checkMobileAuth, getalladdress)
router.delete('/deleteaddress', checkMobileAuth, deleteaddress)
router.delete('/deletealladdress', checkMobileAuth, deletealladdress)
module.exports = router;

function addaddress(req, res, next){
    if(!req.body.mobile){
        res.status(400).send({status:false, message:"mobile field not found!"})
    }
    if(!req.body.address){
        res.status(400).send({status:false, message:"address field not found!"})
    }
    if(!req.body.location){
        res.status(400).send({status:false, message:"location field not found!"})
    }
    if(!req.body.lat){
        res.status(400).send({status:false, message:"lat field not found!"})
    }
    if(!req.body.long){
        res.status(400).send({status:false, message:"Long field not found!"})
    }
    AddressService.addaddress(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Data is incorrect' }))
    .catch(err => next(err));
}

function getaddress(req, res, next){
    if(!req.body.mobile){
        res.status(400).send({status:false, message:"mobile field not found!"})
    }
    AddressService.getaddress(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Data is incorrect' }))
    .catch(err => next(err));
}

function getalladdress(req, res, next){
    AddressService.getalladdress(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Data is incorrect' }))
    .catch(err => next(err));
}

function deleteaddress(req, res, next){
    if(!req.body.mobile){
        res.status(400).send({status:false, message:"mobile field not found!"})
    }
    AddressService.deleteaddress(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Data is incorrect' }))
    .catch(err => next(err));
}

function deletealladdress(req, res, next){
    AddressService.deletealladdress(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Data is incorrect' }))
    .catch(err => next(err));
}