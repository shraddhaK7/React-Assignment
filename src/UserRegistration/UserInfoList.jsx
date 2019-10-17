import axios from 'axios'
import React from 'react';
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
export class UserInfoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    if (this.props.createUserInfoList) {
      alert('clicked');
      this.getData();
    }

  }
  componentWillMount() {
    if (this.props.createUserInfoList) {
      alert('clicked');
      this.getData();
    }
  }
  getData() {

    debugger;


    axios.get('http://localhost:8080/getRegistredUser')
      .then(function (response) {

        if (response) {
          console.log(JSON.stringify(response.data));

          this.setState({ responseData: response.data });

          // that.setState({ toDashboard: true,  userName: response.data.UserName, role:response.data.role});
        } else {
          alert("Please try again later.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });



  }
  render() {
    return (

      <Modal
        {...this.props}
        size="lg"
        style={customStyles}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter centered">
            List of Registred User
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="formAlignment    ">
            {/* col-md-4 Absolute-Center formStyle */}
            <div className="">
              dsdfdsf
{this.props}

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
