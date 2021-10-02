const express = require('express');
const http = require('http');
const router = express.Router();
const {checkMobileAuth} = require('../../middlewares/auth')
const AuthService = require('./AuthService.js');
router.post('/register', checkMobileAuth, register)
router.post('/login', checkMobileAuth, Login)
router.post('/varifyOtp', checkMobileAuth, VarifyOtp)
router.post('/updateUser', checkMobileAuth, updateUser)
router.post('/GetSingleUser', checkMobileAuth, GetSingleUser)
router.get('/GetAllUser', checkMobileAuth, GetAllUser)
router.delete('/DeleteSingleUser', checkMobileAuth, DeleteSingleUser)
router.delete('/DeleteAllUser', checkMobileAuth, DeleteAllUser)
module.exports = router;

//login authenticate function
function Login(req, res, next) {
    if(!req.body.mobile){
        res.status(400).send({status:false,message:"Mobile number not found!"})
    }
    if(!req.body.countryCode){
        res.status(400).send({status:false,message:"Client countryCode not found!"})
    }
    AuthService.userLogin(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'fullname  is incorrect' }))
    .catch(err => next(err));
}

function VarifyOtp(req, res, next){
    if(!req.body.code){
        res.status(400).send({status:false,message:"OTP code not found!"})
    }
    if(!req.body.mobile){
        res.status(400).send({status:false,message:"Mobile number not found!"})
    }
    if(!req.body.countryCode){
        res.status(400).send({status:false,message:"Client countryCode not found!"})
    }
    AuthService.VerifyOTP(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'fullname  is incorrect' }))
    .catch(err => next(err));
}

function register(req, res, next){
    if(!req.body.email){
        res.status(400).send({status:false,message:"email address not found!"})
    }
    if(!req.body.mobile){
        res.status(400).send({status:false,message:"Mobile number not found!"})
    }
    if(!req.body.countryCode){
        res.status(400).send({status:false,message:"Client countryCode not found!"})
    }
    if(!req.body.fullname){
        res.status(400).send({status:false,message:"fullname not found!"})
    }
    AuthService.userRegister(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Something is incorrect' }))
    .catch(err => next(err));
}

function updateUser(req, res, next){
    if(!req.body.mobile){
        res.status(400).send({status:false,message:"Mobile number not found!"})
    }
    AuthService.updateUser(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Something is incorrect' }))
    .catch(err => next(err));
}

function GetSingleUser(req, res, next){
    if(!req.body.mobile){
        res.status(400).send({status:false,message:"Mobile number not found!"})
    }
    AuthService.GetSingleUser(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Something is incorrect' }))
    .catch(err => next(err));
}

function GetAllUser(req, res, next){
    AuthService.GetAllUser(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Something is incorrect' }))
    .catch(err => next(err));
}

function DeleteSingleUser(req, res, next){
    if(!req.body.mobile){
        res.status(400).send({status:false,message:"Mobile number not found!"})
    }
    AuthService.DeleteSingleUser(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Something is incorrect' }))
    .catch(err => next(err));
}

function DeleteAllUser(req, res, next){
    AuthService.DeleteAllUser(req.body)
    .then(user => user ? res.send(user) : res.status(400).send({status:false ,message: 'Something is incorrect' }))
    .catch(err => next(err));
}