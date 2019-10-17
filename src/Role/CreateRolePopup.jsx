import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form' ;

const customRolepopupStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    height: '400px',  
    transform             : 'translate(-50%, -50%)'
  }
};
const pStyle = {
  fontSize: '15px',
  textAlign: 'center'
};
export class CreateRolePopup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            roleName: '',
           
            submitted: false,
            toDashboard: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    
handleChange(e){ debugger;
    const { name, value } = e.target;
    this.setState({ [name]: value });
}
handleSubmit(e) {
    e.preventDefault();
    debugger;
    this.setState({ submitted: true });
    const that = this;
    const data = { roleName:this.state.roleName };
    fetch("http://localhost:8080/role/addRole", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
          }).then(function (response) {
           
              if(response.ok){
                  alert("Role Added successfully.");
              
                  that.setState({ toDashboard: true });
              }else{
                alert("Please try again later.");
              }
          }, (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
    );
}

    render()    {
      const { roleName} = this.state;

        return(
            <Modal
            {...this.props}
            size="lg"
            style={customRolepopupStyles}
            className="is-Responsive roleStyle"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >

            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter centered">
                Create Role
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="  "> 
                <form name="form" onSubmit={this.handleSubmit}>
                   
                    <div className="inputCreateRole">
                        <input type="text" className="form-control" name="roleName" placeholder="Role Name"  value={roleName} onChange={this.handleChange} required/>
                       
                    </div>
                    <lable></lable>
                
                    <div className="regStyle">
                        <button className="btn btn-primary">Add Role</button>
                      
                    </div>
                </form>
            </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
         
        )
    }

}