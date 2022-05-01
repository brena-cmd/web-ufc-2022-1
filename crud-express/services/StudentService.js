
const StudentModel = require('../models/StudentModel')

let students = [
    {_id:0, name:'Fulano', course:'ES', IRA:9.6},
    {_id:1, name:'Brena', course:'CC', IRA:9.6},
    {_id:2, name:'José', course:'EC', IRA:9.6}
]
let _id = 3

class StudentService{

    static register(data){
        let student = new StudentModel(
            _id++,
            data.name,
            data.course,
            data.IRA
        )
        students.push(student)
        return student
    }

    static list(){
        return students
    }

    static update(_id, data){
        for(let s of students){ //enhaced
            if(s._id == _id){
                s.name = data.name
                s.course = data.course
                s.IRA = data.IRA
                return s
            }
        }
        return null
    }

    static delete(_id){
        for(let i=0; i<students.length; i++){
            if(students[i]._id == _id){
                students.splice(i,1)
                return true
            }
        }
        return false
    }

    static retrieve(_id){
        for(let i=0; i<students.length; i++){
            if(students[i]._id == _id){
                return students[i]
            }
        }
        return {}
    }

}
module.exports = StudentService