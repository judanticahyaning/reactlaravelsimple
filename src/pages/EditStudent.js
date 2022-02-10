import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

class EditStudent extends Component
{
    state = {
        name:'',
        course:'',
        email:'',
        phone:'',
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    async componentDidMount()
    {
        const id = this.props.match.params.id;
        const res = await axios.get(`http://localhost:8000/api/edit-student/${id}`);
        if(res.data.status === 200)
        {
            this.setState({
                name:res.data.student.name,
                course:res.data.student.course,
                email:res.data.student.email,
                phone:res.data.student.phone,
            });
        }
    }
    updateStudent = async (e)=>{
        e.preventDefault();
        document.getElementById('updatebtn').innerText = "Updating";
        const id = this.props.match.params.id;
        const res = await axios.put(`http://localhost:8000/api/update-student/${id}`, this.state);
        if(res.data.status === 200)
        {
            console.log(res.data.message);
            document.getElementById('updatebtn').innerText = "Update Student";
        
        }
    }
    render(){
        return(
             <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Student
                                <Link to={'/'} className="btn btn-danger btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateStudent}>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Course</label>
                                        <input type="text" name="course" onChange={this.handleInput} value={this.state.course} className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Phone</label>
                                        <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control"></input>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Student</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default EditStudent;