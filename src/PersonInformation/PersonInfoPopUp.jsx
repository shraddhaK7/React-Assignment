import axios from 'axios'
import React from 'react';
import Form from 'react-bootstrap/Form';
import { Modal, Button, ResponsiveEmbed } from 'react-bootstrap';
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
export class PersonInfoPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      dob: '',
      address: '',
      city: '',
      state: '',
      pin: '',
      phone: '',
      mobile: '',
      physical: '',
      date: '',
      maritalstatus: '',
      eduStatus: '',
      birthStatus: '',
      submitted: false,
      toDashboard: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    debugger;
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });

    // const data = { firstName:this.state.firstName, middleName:this.state.middleName , lastName:this.state.lastName, gender: this.state.gender,
    //     dob:this.state.dob, address:this.state.address , city:this.state.city, state: this.state.state,
    //     pin:this.state.pin, phone:this.state.phone , mobile:this.state.mobile, physical: this.state.physical, maritalstatus:this.state.maritalstatus , eduStatus:this.state.eduStatus, birthStatus: this.state.birthStatus

    // };

    let data = this.state;
    let username = this.props.userName;
    let update = this.props.update;
    let editUpdateUserName = this.props.editUpdateUserName;
    if (update) {
      axios.put('http://localhost:8080/personalInformation/' + editUpdateUserName, data
      )
        .then(function (response) {

          if (response.status === 200) {
            alert(response.data);


          } else {
            alert("Please try again later.");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios.post('http://localhost:8080/CreatePersonal/' + username, data)
        .then(function (response) {

          if (response) {
            console.log(JSON.stringify(response.data));
            alert("User Created successfully.");
            this.setState({ toDashboard: true });

            // that.setState({ toDashboard: true,  userName: response.data.UserName, role:response.data.role});
          } else {
            alert("Please try again later.");
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }



  }
  render() {
    const { firstName, middleName, lastName, gender, dob, address, city, state, pin, phone, mobile, physical, maritalstatus, eduStatus, birthStatus, submitted } = this.state;
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
            User Information
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="formAlignment    ">
            {/* col-md-4 Absolute-Center formStyle */}
            <div className="">
              <form onSubmit={this.handleSubmit}>

                <Table striped hover size="sm">

                  <tbody>
                    <tr>
                      <td>
                        <div className="form-group">
                          {/* <label htmlFor="firstName">First Name </label> */}
                          <input type="text" className="form-control" name="firstName" placeholder="First Name" value={firstName} onChange={this.handleChange} required />
                          {
                            submitted && !firstName &&
                            <div className="help-block">First Name is required</div>
                          }
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          {/* <label htmlFor="middleName">Middle Name </label> */}
                          <input type="text" className="form-control" name="middleName" placeholder="Middle Name" value={middleName} onChange={this.handleChange} required />
                          {submitted && !middleName &&
                            <div className="help-block">Middle Name is required</div>
                          }
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          {/* <label htmlFor="lastName">Last Name </label> */}
                          <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={lastName} onChange={this.handleChange} required />
                          {submitted && !lastName &&
                            <div className="help-block">Last Name is required</div>
                          }
                        </div>
                      </td>
                      <td>
                        <div className="form-group ">


                          <Form.Group controlId="">

                            <Form.Control as="select" name="gender" onChange={this.handleChange}>
                              <option>Gender</option>
                              <option>Female</option>
                              <option>Male</option>
                            </Form.Control>
                          </Form.Group>

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          {/* <label htmlFor="dob">DOB </label> */}
                          <input type="date" className="form-control" name="dob" placeholder="DOB" value={dob} onChange={this.handleChange} required />
                          {submitted && !dob &&
                            <div className="help-block">DOB  is required</div>
                          }
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          {/* <label htmlFor="address">Address </label> */}
                          <input type="text" className="form-control" name="address" placeholder="Address" value={address} onChange={this.handleChange} required />
                          {submitted && !address &&
                            <div className="help-block">DOB  is required</div>
                          }
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>     <div className="form-group">
                        {/* <label htmlFor="city">City </label> */}
                        <input type="text" className="form-control" name="city" placeholder="City" value={city} onChange={this.handleChange} required />
                        {submitted && !city &&
                          <div className="help-block">City  is required</div>
                        }
                      </div>
                      </td>
                      <td>
                        <div className="form-group">
                          {/* <label htmlFor="state">State </label> */}
                          <input type="text" className="form-control" name="state" placeholder="State" value={state} onChange={this.handleChange} required />
                          {submitted && !state &&
                            <div className="help-block">State  is required</div>
                          }
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>

                        <div className="form-group">
                          {/* <label htmlFor="pin">Pin Code </label> */}
                          <input type="number" className="form-control" name="pin" placeholder="Pin Code " value={pin} onChange={this.handleChange} required />
                          {submitted && !pin &&
                            <div className="help-block">Pin Code  is required</div>
                          }
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          {/* <label htmlFor="phone">Phone No</label> */}
                          <input type="number" className="form-control" name="phone" placeholder="Phone Number" value={phone} onChange={this.handleChange} required />
                          {submitted && !phone &&
                            <div className="help-block">Phone Number  is required</div>
                          }
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          {/* <label htmlFor="mobile">Mobile No</label> */}
                          <input type="number" className="form-control" name="mobile" placeholder="Mobile No" value={mobile} onChange={this.handleChange} required />
                          {submitted && !mobile &&
                            <div className="help-block">Mobile Number  is required</div>
                          }
                        </div>
                      </td>
                      <td>
                        <div className="form-group">

                          <input type="text" className="form-control" name="physical" placeholder="Physical Disability If Any" value={physical} onChange={this.handleChange} />

                        </div>
                      </td>
                    </tr>

                    <tr>

                      <td>
                        <div className="form-group">
                          <Form.Group controlId="">

                            <Form.Control as="select" name="maritalstatus" onChange={this.handleChange}>
                              <option>Marital Status</option>
                              <option>Married</option>
                              <option>Unmarried</option>
                              <option>Divorced</option>
                              <option>Widow</option>

                            </Form.Control>
                          </Form.Group>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">

                          <Form.Group controlId="">

                            <Form.Control as="select" name="eduStatus" onChange={this.handleChange} >
                              <option>Education Status</option>
                              <option>Masters</option>
                              <option>Phd</option>
                              <option>Graduate</option>
                              <option> Under-Graduate</option>
                              <option>Phd</option>
                              <option>HSC</option>
                              <option>SSC</option>
                            </Form.Control>
                          </Form.Group>
                        </div>
                      </td>
                    </tr>
                    <tr>

                      <td>
                        <div className="form-group">
                          <input type="text" className="form-control" name="birthStatus" placeholder="Birth Status" value={birthStatus} onChange={this.handleChange} required />

                        </div>
                      </td>

                    </tr>
                  </tbody>
                </Table>
                <div className="form-group">
                  <button className="btn btn-primary">Save</button>
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
