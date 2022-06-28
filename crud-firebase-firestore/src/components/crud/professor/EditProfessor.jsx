import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

import FirebaseContext from "../../../utils/FirebaseContext";
import ProfessorService from "../../../services/ProfessorService";
import RestrictPage from "../../../utils/RestrictPage";

const EditProfessorPage = () => 
<FirebaseContext.Consumer>
    {
        (firebase) => {
            return (
                <RestrictPage isLogged={firebase.getUser()!=null}>
                    <EditProfessor firebase={firebase} />
                </RestrictPage>
            )
        }
    }
</FirebaseContext.Consumer>

function EditProfessor(props) {

    const [name, setName] = useState("")
    const [university, setUniversity] = useState("")
    const [degree, setDegree] = useState("Graduado")
    const params = useParams()
    const navigate = useNavigate();

    useEffect(
        // () => {
        //     axios.get(`http://localhost:3002/professors/retrieve/${params.id}`)
        //         .then(
        //             (response) => {
        //                 //console.log(response.data)
        //                 setName(response.data.name)
        //                 setUniversity(response.data.university)
        //                 setDegree(response.data.degree)
        //             }
        //         )
        //         .catch(error => console.log(error))
        // },
        // [params.id]
        () => {
            ProfessorService.retrieve_promisse(
                props.firebase.getFirestoreDb(),
                (professor)=>{
                    setName(professor.name)
                    setUniversity(professor.university)
                    setDegree(professor.degree)
                },
                params.id
            )
        },
        [params.id,props]
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedProfessor = { name, university, degree }
        // axios.put(`http://localhost:3002/professors/update/${params.id}`, updatedProfessor)
        //     .then(response => navigate("/listProfessor"))
        //     .catch(error => console.log(error))
        ProfessorService.update(
            props.firebase.getFirestoreDb(),
            ()=>{
                navigate("/listProfessor")
            },
            params.id,
            updatedProfessor)
    }

    return (
        <>
            <main>
                <h2>
                    Editar Professor
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            className="form-control"
                            value={(name == null || name === undefined) ? "" : name}
                            name="name"
                            onChange={(event) => { setName(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Universidade: </label>
                        <input type="text"
                            className="form-control"
                            value={university ?? ""}
                            name="university"
                            onChange={(event) => { setUniversity(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Titulação: </label>
                        <input type="text"
                            className="form-control"
                            value={degree ?? "  "}
                            name="degree"
                            onChange={(event) => { setDegree(event.target.value) }} />
                    </div>
                    <div className="form-group" style={{ paddingTop: 20 }}>
                        <input type="submit" value="Atualizar Professor" className="btn btn-primary" />
                    </div>
                </form>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default EditProfessorPage