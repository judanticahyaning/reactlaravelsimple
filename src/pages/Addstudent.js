import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

class Addstudent extends Component
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
    saveStudent = async (e)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:8000/api/add-student', this.state);
        if(res.data.status === 200)
        {
            console.log(res.data.message);
            this.setState({
                name:'',
                course:'',
                email:'',
                phone:'',
            });
        }
    }
    render(){
        return(
             <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Student
                                <Link to={'/'} className="btn btn-danger btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveStudent}>
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
                                        <button type="submit" className="btn btn-primary">Save Student</button>
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
export default Addstudent;