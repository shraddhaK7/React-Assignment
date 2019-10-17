import React from 'react';
import {Link} from 'react-router-dom';

class Registeration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            email:'',
            password: '',
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });

    }
    handleSubmit(e){
        e.preventDefault();
        debugger;
        this.setState({ submitted: true });
        const data = { userName:this.state.userName, emailId:this.state.email , password:this.state.password};
        fetch("http://localhost:8080/userregisteration", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
          }).then(function (response) {
              if(response.ok){
                  alert("User created successfully.");
              }else{
                alert("Please try again later.");
              }
          }).catch(function (error) {
            console.log(error);
            if(error && error.response && error.response.data && error.response.data.message){
                alert(error.response.data.message );
                this.setState({ error: error.response.data.message });
            } 
          }
          
          );
    }


    render(){
        const { userName, email, password, submitted } = this.state;
        return(
            <div className="col-md-4 personalForm Absolute-Center is-Responsive formStyle">
                <form name="form" className="" onSubmit={this.handleSubmit}>
                    <h4>Create Account</h4>
                    <div >
                        <label htmlFor="username"> User Name</label>
                        <input type="text" className="form-control" name="userName"  value={userName} onChange={this.handleChange} required/>
                        {submitted && !userName &&
                            <div className="help-block">Username is required</div>
                        }
                       
                    </div>
                    <div >
                        <label htmlFor="password"> Email Address</label>
                        <input type="email" className="form-control" name="email"  value={email} onChange={this.handleChange} required/>
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div >
                        <label htmlFor="password"> Password</label>
                        <input type="password" className="form-control" name="password"  value={password} onChange={this.handleChange} required/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="regStyle">
                        <button className="btn btn-primary">Register</button>
                       
                    </div>
                   
                         
                        
                
            </form>
            <div className="regStyle">
                        <Link to="/" className="btn create-btn-link">Login</Link>
                    </div>
            </div>
 
        );
    }
}

export default Registeration;