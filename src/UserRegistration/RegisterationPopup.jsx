import axios from 'axios'
import React from 'react';
import Form from 'react-bootstrap/Form';
import {Modal, Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
export class RegisterationPopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            email:'',
            password: '',
            submitted: false,
            role:'',
            authorized:''
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
        let role = this.props.role;
        let v = "";
        if(role === "admin" || role ==="operator"){
          v = "Yes";
        }else{
         v = "No";
        }
        const data = { userName:this.state.userName, emailId:this.state.email , password:this.state.password, authorized : v};
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
        const { userName, email, password, submitted, authorized } = this.state;  return(
         
            <Modal
            {...this.props}
            size="lg"
            style={customStyles}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >

            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter centered">
              Create Account
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="formAlignment    ">
                {/* col-md-4 Absolute-Center formStyle */}
            <div className=""> 
            <form name="form" className="" onSubmit={this.handleSubmit}>
                
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
          
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>




      
              
               
        );
    }
}
