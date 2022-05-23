var mongoose = require('mongoose');
//criando o schema, o qual servirá para criar o modelo (collections)
var ProfessorSchema = mongoose.Schema(
 {
 name: {type:String, required:true, max:200},
 university: {type:String, required:true, max:200},
 degree: {type:String, required:true, max:200},
 }
);
//criando o modelo a partir do schema acima, o qual servirá para incluir as instâncias
//(documentos)
var ProfessorModel = mongoose.model('professors', ProfessorSchema);
//retornando o modelo a ser usado pelo serviço (CRUD).
module.exports = ProfessorModel;