const ProfessorModel = require("../../models/professor/professor.model")

class ProfessorService {

    static create(req, res) {
        ProfessorModel.create(req.body)
            .then(
                (Professor) => {
                    res.status(201).json(Professor);
                }
            );
    }

    static retrieve(req, res) {
        ProfessorModel.findById(req.params.id)
        .then(
            (Professor) => {
                res.status(200).json(Professor);
            }
        );
    }

    static update(req, res) {
        ProfessorModel.findByIdAndUpdate(req.params.id, req.body, { 'new': true })
            .then(
                (Professor) => {
                    res.status(200).json(Professor);
                }
            );
    }

    static delete(req, res) {
        ProfessorModel.findByIdAndRemove(req.params.id)
            .then(
                (Professor) => {
                    res.status(200).json(Professor);
                }
            );
    }

    //retorna um vetor de Professor
    static list(req, res) {
        ProfessorModel.find()
            .then(
                (Professors) => {
                    res.status(200).json(Professors);
                }
            );
    }

}

module.exports = ProfessorService