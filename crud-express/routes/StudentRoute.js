var express = require('express');
var router = express.Router();

var StudentService = require('../services/StudentService')
//router é um objeto que vem do express
router.get('/list', function(req,res,next){
    res.json(StudentService.list())

})

router.post('/register', function(req,res,next){
    //O cliente está fazendo uma requisicao para registrar
    //as informações do registro está no corpo da requisição
    res.json(StudentService.register(req.body))
})


router.put('/update/:id', function(req, res,next){
    const student = StudentService.update(req.params.id, req.body)
    return res.json(student)
})

router.delete('/delete/:id', function(req,res,next){
    const ok = StudentService.delete(req.params.id)
    if(ok) return res.json({"sucess":true})
    else return res.json({"sucess":false})
})

router.get('/retrieve/:id', function(req,res,next){
    const student = StudentService.retrieve(req.params.id)
    return res.json(student)
})
module.exports = router