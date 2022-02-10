import { Component, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

class Student extends Component
{
    
    state = {
        students:[],
        loading:true,
    }
    async componentDidMount(){
        const res = await axios.get('http://localhost:8000/api/students');
        if(res.data.status === 200)
        {
            this.setState({
                students:res.data.students,
                loading : false,
            });
        }
    }
    deteleStudent = async (e, id) =>{
        const thisClickFunda = e.currentTarget;
        thisClickFunda.innerText = "Deleting"; 
        const res = await axios.delete(`http://localhost:8000/api/delete-student/${id}`)
        if(res.data.status === 200)
        {
            thisClickFunda.closest("tr").remove();
            console.log(res.data.message);
        }
    }
    searchStudent = async (key)=>{
        console.warn(key);
        if(key==="")
        {
            const res = await axios.get('http://localhost:8000/api/students');
            if(res.data.status === 200)
            {
                this.setState({
                    students:res.data.students,
                    loading : false,
                });
            }
        }
        else
        {
            let result = await axios.get("http://localhost:8000/api/search/"+key)
            if(result.data.status === 200)
            {
                this.setState({
                    students:result.data.students,
                    loading : false,
                });
            }
        }
        
        
        
    }
    render(){
        var student_HTML_TABLE = "";
        if(this.state.loading)
        {
            student_HTML_TABLE = <tr><td colSpan="7"><h2>Loading...</h2></td></tr>;
        }
        else
        {
            student_HTML_TABLE =
            this.state.students.map( (item) => {
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                            <Link to={`edit-student/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td>
                            <button type="button" onClick = {(e)=>this.deteleStudent(e,item.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                );
            });
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Students Data
                                <Link to={'add-student'} className="btn btn-primary btn-sm float-end">Add Student</Link>
                                </h4>
                                <input 
                                    onChange = {(e)=>this.searchStudent(e.target.value)}
                                    type="text" 
                                    placeholder="Type name to search">
                                        
                                </input>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Course</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_HTML_TABLE}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default Student;