import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Student from './pages/Student';
import Addstudent from "./pages/Addstudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <Router >
      <Switch>
        <Route exact path="/" component={Student}></Route>
        <Route path="/add-student" component={Addstudent}></Route>
        <Route path="/edit-student/:id" component={EditStudent}/>
      </Switch>
    </Router>
    
  );
}

export default App;
