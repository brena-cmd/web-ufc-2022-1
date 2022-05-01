
const ProfessorModel = require('../models/ProfessorModel')

let professors = [
    {_id:0, name:'Fulano', university:'UFC', degree:'mestre'},
    {_id:1, name:'Brena', university:'UFBA', degree:'doutor'},
    {_id:2, name:'José', university:'UECE', degree:'graduado'}
]
let _id = 3

class ProfessorService{

    static register(data){
        let professor = new ProfessorModel(
            _id++,
            data.name,
            data.university,
            data.degree
        )
        professors.push(professor)
        return professor
    }

    static list(){
        return professors
    }

    static update(_id, data){
        for(let p of professors){ //enhaced
            if(p._id == _id){
                p.name = data.name
                p.university = data.university
                p.degree = data.degree
                return p
            }
        }
        return null
    }

    static delete(_id){
        for(let i=0; i<professors.length; i++){
            if(professors[i]._id == _id){
                professors.splice(i,1)
                return true
            }
        }
        return false
    }

    static retrieve(_id){
        for(let i=0; i<professors.length; i++){
            if(professors[i]._id == _id){
                return professors[i]
            }
        }
        return {}
    }

}
module.exports = ProfessorService