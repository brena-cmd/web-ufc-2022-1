import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

import ProfessorTableRow from "./ProfessorTableRow";

import FirebaseContext from "../../../utils/FirebaseContext";
import ProfessorService from "../../../services/ProfessorService";
import RestrictPage from "../../../utils/RestrictPage";


const ListProfessorPage = () => 
    <FirebaseContext.Consumer>
        {
            (firebase) => {   
                <RestrictPage isLogged={firebase.getUser() != null}>
                    <ListProfessor firebase={firebase} />
                </RestrictPage>
            }   
        }
    </FirebaseContext.Consumer>


function ListProfessor(props) {

    const [professors, setProfessors] = useState([])
    //const [flag, setFlag] = useState(false)
    useEffect(        
        ()=>{
        //   axios.get("http://localhost:3002/professors/list")
        //   .then(
        //       (response)=>{
        //           //console.log(response.data)
        //           setProfessors(response.data)
        //       }
        //   )
        //   .catch(error=>console.log(error))
        ProfessorService.list_onSnapshot(
            props.firebase.getFirestoreDb(), 
            (professors)=>{
                setProfessors(professors)
            }
        )
    }
    ,
    [props] 
    )

    function deleteProfessorById(id){
        let professorsTemp = professors
        for(let i=0;i<professorsTemp.length;i++){
            if(professorsTemp[i]._id === id){
                //console.log("1")
                professorsTemp.splice(i,1)
            }
        }
        setProfessors([...professorsTemp]) //deve-se criar um outro array para disparar o re-render
        //setFlag(!flag)
    }

    function generateTable() {
        if (loading) {
            //mostrar um spinner!
            return (
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:100
                }}>
                    <div className="spinner-border" 
                     style={{width: '3rem', height: '3rem'}} 
                     role="status" />
                     Carregando...
                </div>
            )
        }
        if (!professors) return
        return professors.map(
            (professor, i) => {
                return <ProfessorTableRow 
                            professor={professor} 
                            key={i} 
                            deleteProfessorById={deleteProfessorById}
                            firestoreDb = {props.firebase.getFirestoreDb()}
                            />
            }
        )
    }

    return (
        <>
            <main>
                <h2>
                    Listar Professores
                </h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Universidade</th>
                            <th>Titulação</th>
                            <th colSpan={2} style={{ textAlign: "center" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTable()}
                    </tbody>
                </table>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default ListProfessorPage