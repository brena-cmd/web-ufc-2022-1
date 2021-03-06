//usando o mongoose (FRONT-END para o mongoDB)
var mongoose = require('mongoose');

//updating
//mongoose.set('useFindAndModify', false);

//conexão local
var mongoDB_URI = 'mongodb://localhost:27017/university_ufc';
mongoose.connect(mongoDB_URI,{useNewUrlParser:true});

//armazena a conexão em uma variável
var db = mongoose.connection;
//listeners
db.on('connected',()=>{
 console.log('Mongoose Connected to '+mongoDB_URI);
});
db.on('disconnected',()=>{
 console.log('Mongoose Disconnected to '+mongoDB_URI);
});
db.on('error',(err)=>{
 console.log('Mongoose Error: '+err);
});