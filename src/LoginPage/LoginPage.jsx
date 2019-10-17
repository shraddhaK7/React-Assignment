import axios from 'axios'
import React from 'react';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Redirect, Route, Switch } from "react-router"

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            roleName:'',
            submitted: false,

            toDashboard: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
}

handleChange(e){    

    const { name, value } = e.target;
    this.setState({ [name]: value });
}
handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const that = this;
    const data = { userName:this.state.userName, emailId:this.state.email , password:this.state.password, roleName: this.state.roleName};
    // fetch("http://localhost:8080/login", {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //           },
    //         body: JSON.stringify(data)
    //       }).then(function (response) {
    //           debugger;
    //           if(response.ok){
    //               console.log(JSON.stringify(response));
    //               alert("Logined successfully.");
    //               debugger;
    //               that.setState({ toDashboard: true });
    //           }else{
    //             alert("Please try again later.");
    //           }
    //       }, (error) => {
    //         this.setState({
    //           isLoaded: true,
    //           error
    //         });
    //       }      
    // );

    axios.post('http://localhost:8080/login',   data
      )
      .then(function (response) {
        console.log( "response" + JSON.stringify(response));
        debugger;
        if(response.status === 200){
            console.log(JSON.stringify(response.data));
            alert("Logined successfully.");
             debugger;
             that.setState({ toDashboard: true,  userName: response.data.UserName, role:response.data.role});
        }
        else if(response.status === 403){
            alert("User is no approved");
         
        }else{
          alert("Please try again later.");
     }
      })
      .catch(function (error) {
        
        if(error && error.response && error.response.data){
            alert(error.response.data );
            
        }
       
      });
}
   render() {
        const { userName, password, submitted } = this.state;
        if(this.state.toDashboard === true){
            // return <Redirect to="/Dashboard" /> 
            // return <Redirect to={{
            //     pathname: '/Dashboard',
            //     state: {username : this.state.userName, role: this.state.role }
            // }}

            this.props.history.push({
                pathname:"/Dashboard",
                state:{
                    username : this.state.userName, role: this.state.role
                 }
               });
    
        }
        return (
            <div className="col-md-4 personalForm Absolute-Center is-Responsive formStyle"> 
                <form name="form" onSubmit={this.handleSubmit}>
                    <h4>Sign in</h4>
                    <div >
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="userName"  value={userName} onChange={this.handleChange} />
                        {submitted && !userName &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div >
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange}  />
                        {submitted && !password && 
                             <div className="help-block">Password is required</div>
                        }
                    </div>
                    {/* <div class="form-group">
                    <label htmlFor="role">Role</label>
                <Form.Group controlId="">
 
    <Form.Control as="select" name="roleName" onChange={this.handleChange}>
    <option>Role</option>
        <option>Access User</option>
      <option>Admin</option>
      <option>Operator</option>

 
    </Form.Control>
  </Form.Group>
                </div> */}
                    <div className="regStyle">
                        <button className="btn btn-primary">Login</button>
                        <Link to="/registeration" className="btn create-btn-link">Create account</Link>
                    </div>
                </form>
            </div>
        );
    }

}
export default LoginPage;