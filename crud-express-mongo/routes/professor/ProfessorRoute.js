var express = require('express');
var router = express.Router();

var ProfessorService = require('../../services/ProfessorService')
//router é um objeto que vem do express
router.get('/list', function(req,res,next){
    res.json(ProfessorService.list())

})

router.post('/register', function(req,res,next){
    //O cliente está fazendo uma requisicao para registrar
    //as informações do registro está no corpo da requisição
    res.json(ProfessorService.register(req.body))
})


router.put('/update/:id', function(req, res,next){
    const professor = ProfessorService.update(req.params.id, req.body)
    return res.json(professor)
})

router.delete('/delete/:id', function(req,res,next){
    const ok = ProfessorService.delete(req.params.id)
    if(ok) return res.json({"sucess":true})
    else return res.json({"sucess":false})
})

router.get('/retrieve/:id', function(req,res,next){
    const professor = ProfessorService.retrieve(req.params.id)
    return res.json(professor)
})

module.exports = router