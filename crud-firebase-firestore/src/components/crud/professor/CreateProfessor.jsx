import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';

import FirebaseContext from "../../../utils/FirebaseContext";
import ProfessorService from "../../../services/ProfessorService";
import RestrictPage from "../../../utils/RestrictPage";

const CreateProfessorPage  = () => 
<FirebaseContext.Consumer>
    {
        (firebase) => {
            return (
                <RestrictPage isLogged={firebase.getUser()!=null}>
                    <CreateProfessor firebase={firebase} />
                </RestrictPage>
            )
        }
    }
</FirebaseContext.Consumer>

function CreateProfessor(props) {
    const [name, setName] = useState("")
    const [university, setUniversity] = useState("")
    const [degree, setDegree] = useState("Graduado")
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        const newProfessor = {name,university,degree}
        // axios.post("http://localhost:3002/professors/register/",newProfessor)
        // .then(
        //     (response)=>{
        //         console.log(response.data)
        //         alert(`Professor ${name} criado com sucesso.`)
        //         navigate("/listProfessor")
        //     }
        // )
        // .catch(error=>console.log(error))
        ProfessorService.create( 
            props.firebase.getFirestoreDb(),
            ()=>{
             navigate("/listProfessor")
            },
            newProfessor)
 
        //  console.log(name)
        //  console.log(university)
        //  console.log(degree)
    }

    return (
        <>
            <main>
                <h2>
                    Criar Professor
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
                            value={degree ?? 0}
                            name="degree"
                            onChange={(event) => { setDegree(event.target.value) }} />
                    </div>
                    <div className="form-group" style={{ paddingTop: 20 }}>
                        <input type="submit" value="Criar Professor" className="btn btn-primary" />
                    </div>
                </form>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default CreateProfessorPage