const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');

router.get('/',auth,(req,res)=>{
    return res.status(200).send({message: `tudo ok GET na raiz`});
})

router.post('/',(req,res)=>{
    return res.status(200).send({message: `tudo ok POST na raiz`});
})

module.exports = router