import React from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popup from "reactjs-popup";
import {login} from '../LoginPage/LoginPage';
import {CreateRolePopup} from "../Role/CreateRolePopup";
import {PersonInfoPopUp} from "../PersonInformation/PersonInfoPopUp";
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {AllUserResultPage} from '../AllUserType/AllUserResultPage';
import Table from 'react-bootstrap/Table';
import {ViewPerosnalInfo} from '../PersonInformation/ViewPerosnalInfo';
import {RegisterationPopup} from '../UserRegistration/RegisterationPopup';
import {UserInfoList} from '../UserRegistration/UserInfoList';
import {UpdateAcessUser} from '../PersonInformation/UpdateAcessUser';


let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};
class Dashboard extends React.Component{
    constructor(props) {
  
      super(props);
      this.state = {  createUserInfoList:false,update: false, updateUserListClicked : false, userInfoButtonClicked : false, userTypeSelectListClicked : false, userName : this.props.location.state.username, editUpdateUsername:'',
      userRole : this.props.location.state.role, createRolepopupShow:false, disableCreateProfile: false, registerUserInfo: false, personalInfoShow: false, reponseViewInfo:[], updateAccessShow:false, AuthorizedShow:false, selectedUserType:'', Authorization:'', viewpersonalInfoShow:false , roleResponseData : []};
      this.handleChange = this.handleChange.bind(this);
      this.viewPersonalInfoHandler = this.viewPersonalInfoHandler.bind(this);
      this.userListHandler = this.userListHandler.bind(this);
      this.viewInfo = this.viewInfo.bind(this);
      this.persmissiomUserListHandler = this.persmissiomUserListHandler.bind(this); 
      this.userRequestApproveHandler = this.userRequestApproveHandler.bind(this); 
      
      this.getRoles();

    }
    
    componentDidMount(){ debugger;
      let userName = this.state.userName;
    const that = this;
    debugger;
   
    axios.get('http://localhost:8080/getByRegistredUserName/'+userName)
    .then(function (response) { 
 
      if(response && response.status === 200){
          console.log(JSON.stringify(response.data));
         
          that.setState({ reponseViewInfo: response.data , viewInfoFlag:true, disableCreateProfile: true});
          
      } else if(response.status === 404){
        alert("Please create profile.");
     
    }else{
        alert("Please try again later.");
   }
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    handleChange(e){     
    const that = this;
      const { name, value } = e.target;
      let data = "";
      debugger;
      let typeSelect = "";
      if(e.target && e.target.value){
        typeSelect = e.target.value;
      }else{
        typeSelect = "All User";
      }
      switch(typeSelect) {
        case 'Authorized':
             data = "Yes";
           break;
        case 'Un-Authorized':
            data = "No";
            break;
        case 'All User':
            data = "All";
            break;
          default :
          data = "All"
        break;
        }
            data.replace("=","");
          
            this.setState({ Authorization: data });
 
   if(data === "All"){
    axios.get('http://localhost:8080/getRegistredUser',axiosConfig
    )
    .then(function (response) {
    
      if(response.status === 200){
           that.setState({ responseAuthorizedUnData: response.data, userTypeSelectListClicked: true,
            userInfoButtonClicked: false,updateUserListClicked : false });
      }else{
        alert("Please try again later.");
   }
    })
    .catch(function (error) {
      console.log(error);
    });
   }else{
    axios.post('http://localhost:8080/getUserType', data,axiosConfig
    )
    .then(function (response) {
    
      if(response.status === 200){
           that.setState({ responseAuthorizedUnData: response.data,
            userInfoButtonClicked: false, updateUserListClicked: false,userTypeSelectListClicked: true });
      }else{
        alert("Please try again later.");
   }
    })
    .catch(function (error) {
      alert("User is not present.");
      console.log(error);
    });
   }
     
  }

  approveButtonClickHandler(e) {
    let approve = e.target.value;
    const data = { userName:approve};
    
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    axios.put('http://localhost:8080/approveUser', data,axiosConfig
    )
    .then(function (response) {
    
      if(response.status === 200){
        alert("User Approved");
      
        
      }else{
        alert("Please try again later.");
   }
    })
    .catch(function (error) {
      console.log(error);
    });
   }


  

   viewPersonalInfoHandler(e){
    const that = this;
    debugger;
     const data = { userName:e.target.value};



     axios.post('http://localhost:8080/getPersonalInfo', data,axiosConfig
    )
    .then(function (responsePersonal) {
    
      if(responsePersonal.status === 200){
           that.setState({ responsePersonalInfo: responsePersonal.data,
          userInfoButtonClicked: true, userTypeSelectListClicked: false });
      }else{
        alert("Please try again later.");
   }
    })
    .catch(function (error) {
      console.log(error);
    });
   }
   userListHandler(e){
    const that = this;
     axios.get('http://localhost:8080/getRegistredUser')
     .then(function (response) { 
  
       if(response){
           console.log(JSON.stringify(response.data));
          
           that.setState({ responseUserListData: response.data,  updateUserListClicked: true , userTypeSelectListClicked: false});
           
           // that.setState({ toDashboard: true,  userName: response.data.UserName, role:response.data.role});
       }else{
         alert("Please try again later.");
    }
     })
     .catch(function (error) {
       console.log(error);
     });
   }
   viewInfo(e) {
    let userName = e.target.value;
    const that = this;
    debugger;
   
    axios.get('http://localhost:8080/getByRegistredUserName/'+userName)
    .then(function (response) { 
 
      if(response && response.status === 200){
          console.log(JSON.stringify(response.data));
         
          that.setState({ reponseViewInfo: response.data , viewInfoFlag:true, disableCreateProfile: true});
          
      } else if(response.status === 404){
        alert("Please create profile.");
     
    }else{
        alert("Please try again later.");
   }
    })
    .catch(function (error) {
      console.log(error);
    });
   }
   bindRoleList(){
    const roleList =  this.state.roleResponseData.map((role, i) => {
      return (
        
        <option key={i} value={role.roleId}>{role.roleName}</option>
      )
    }, this);
          this.setState({
            roleList : roleList
          });
   }
   persmissiomUserListHandler(e){
    const that = this;
    
    that.bindRoleList();
     axios.get('http://localhost:8080/getRegistredUser')
     .then(function (response) { 
  
       if(response){
           console.log(JSON.stringify(response.data));
          
           that.setState({ persmissionUserListData: response.data,  updateUserListClicked: false ,  userInfoButtonClicked: false, userTypeSelectListClicked: false ,  persmissiomUserListClicked : true});
           
           // that.setState({ toDashboard: true,  userName: response.data.UserName, role:response.data.role});
       }else{
         alert("Please try again later.");
    }
     })
     .catch(function (error) {
       console.log(error);
     });
   }
   userRequestApproveHandler(e){
    const that = this;
    debugger;
     axios.get('http://localhost:8080/cacheUserList')
     .then(function (response) { 
  
       if(response){
           that.setState({ cacheUserListData: response.data,  updateUserListClicked: false ,  userInfoButtonClicked: false, userTypeSelectListClicked: false ,  persmissiomUserListClicked : false , cacheUserListClicked: true});
           
       }else{
         alert("Please try again later.");
    }
     })
     .catch(function (error) {
        alert("User request are not present.");
       console.log(error);
     });
   }

   roleChangeSaveClickHandler(e){
     debugger;
    let userName = e.target.parentNode.id;
    let roleId = e.target.value;

      axios.put('http://localhost:8080/roleChange/'+userName+'/'+roleId, 
     )
     .then(function (response) {
    
       if(response.status === 200){
         alert("Role Changed");
         window.location.reload(); 
      }else{
         alert("Please try again later.");
    }
    })
    .catch(function (error) {
      console.log(error);
    }); 
   
   }

  getRoles(){
    const that = this;
     axios.get('http://localhost:8080/role')
     .then(function (roleResponse) { 
  
       if(roleResponse){
           console.log(JSON.stringify(roleResponse.data));
          
           that.setState({ roleResponseData: roleResponse.data});
           
           // that.setState({ toDashboard: true,  userName: response.data.UserName, role:response.data.role});
       }else{
         alert("Please try again later.");
    }
     })
     .catch(function (error) {
       console.log(error);
     });
  }

displayData(){
  return(  
    
    
    <div>


 <Table striped bordered hover size="sm" className= "Usertable">
<thead>
<tr>
 <th>#</th>
 <th>User Name</th>      
 <th>Email Id</th>
<th>Authorized</th>
{        
  this.state.Authorization === "No" ? (
<th>Authorize</th>
) : ""}

</tr>
</thead>
<tbody class="tableBody">
      { 
          this.state.responseAuthorizedUnData.map((user, i) => {
    
  return<tr key={ i}> <td>{i+1}</td>
   <td>{user.userName}</td>
                  <td>{user.emailId}</td>
                  <td>{user.authorized}</td>
                  
                  {
                  this.state.Authorization === "No" ? (
                    <td><Button className="btn btn-primary"  value={user.userName} onClick={this.approveButtonClickHandler}>
                   Approve
                   </Button>
                   </td>
) : ""}
          </tr>
  })
}
</tbody>
</Table>
    </div>

  )
}

personalInfo(){
  return(
    <div>
<div className="col-md-12 is-Responsive formStyle form-scroll"> 
  <h2>Personal Information</h2>
    <form name="form">
                    <div   className="form-group">
                        <label htmlFor="userName"> Name: </label>
                        <input type="text" className="form-control" name="userName" placeholder="Role Name"  value={this.state.responsePersonalInfo.userName} onChange={this.handleChange} required>
                          
                          </input>
                      
                    </div>
                    <div   className="form-group">
                        <label htmlFor="authorized"> Authorization Approved: </label>
                        <input type="text" className="form-control" name="authorized" placeholder="Role Name"  value={this.state.responsePersonalInfo.authorized} onChange={this.handleChange} required/>
                    </div>
                    <div   className="form-group">
                        <label htmlFor="emailId"> Email ID: </label>
                        <input type="text" className="form-control" name="emailId" placeholder="Role Name"  value={this.state.responsePersonalInfo.emailId} onChange={this.handleChange} required/>
                    </div>
                    <div   className="form-group">
                        <label htmlFor="roleName"> Role Name: </label>
                        <input type="text" className="form-control" name="roleName" placeholder="Role Name"  value={this.state.responsePersonalInfo.emailId} onChange={this.handleChange} required/>
                    </div>
                    <div   className="form-group">
                        <label htmlFor="password"> Email ID: </label>
                        <input type="text" className="form-control" name="roleName" placeholder="Role Name"  value={this.state.responsePersonalInfo.emailId} onChange={this.handleChange} required/>
                    </div>
              
                    </form>
            </div>
           
          

    </div>

  )
}
displayUserList(){ 
  return( 
    <div>

    <Table striped bordered hover size="sm" className= "Usertable">
<thead>
<tr>
 <th>#</th>
 <th>User Name</th>      
 <th>Email Id</th>
<th>Authorized</th>
<th>Role</th>
<th>Create/Update</th>
</tr>
</thead>
<tbody class="tableBody">
      { 
          this.state.responseUserListData.map((user, i) => {
    
  return<tr key={ i++}> <td>{i++}</td>
   <td>{user.userName}</td>
                  <td>{user.emailId}</td>
                  <td>{user.authorized}</td>
                  <td>{user.role}</td>
                 <Button className="btn btn-primary" value={user.userName} onClick={()=>this.setState({personalInfoShow:true , update:true, editUpdateUsername: user.userName})}>
                   Create/Update
                   </Button>
           </tr>
  })
}
</tbody>
</Table>
   </div>
  )
}
permissionButtonClickHandler(e){
  const that = this;
   axios.get('http://localhost:8080/getRegistredUser')
     .then(function (response) {
       if(response){
           that.setState({ responseUserListData: response.data,  updateUserListClicked: true , userTypeSelectListClicked: false});
       }else{
         alert("Please try again later.");
    }
     })
     .catch(function (error) {
       console.log(error);
     });

}
approverUserChangeHandler(e){ debugger;
  let userName = e.target.value;
  axios.put('http://localhost:8080/editUser/'+userName
  )
  .then(function (response) {
  
    if(response.status === 200){
      alert("User Changes Approved");
    
      
    }else{
      alert("Please try again later.");
 }
  })
  .catch(function (error) {
    console.log(error);
  });
 }

displayPermissionList(){
  return( 
    <div>
      
    <Table striped bordered hover size="sm" className= "Usertable">
<thead>
<tr>
 <th>#</th>
 <th>User Name</th>      
 <th>Email Id</th>
<th>Authorization</th>
<th>Role</th>
<th>Change Role</th>
</tr>
</thead>
<tbody class="tableBody">
      { 
          this.state.persmissionUserListData.map((user, i) => {
    
  return<tr key={ i++}> <td>{i++}</td>
   <td>{user.userName}</td>
                  <td>{user.emailId}</td>
                  <td>{user.authorized}</td>
                  <td>{user.role}</td>
                  <td id={user.userName} >
                    
                    <select value={this.state.value}  onChange={(e) => { if (window.confirm('Are you sure you wish to change role?')) this.roleChangeSaveClickHandler(e) } } 
                    >
                      {this.state.roleList}
                    </select>
                  </td> </tr>
  })
}
</tbody>
</Table>


    </div>
  )
}
refreshPage(){ 
  window.location.reload(); 
}
displayCacheList(){
  return( 
    <div>
    <Table striped bordered hover size="sm" className= "Usertable">
<thead>
<tr>
 <th>#</th>
 <th>User Name</th>      
 <th>Email Id</th>
<th>Mobile</th>
<th>Approve</th>
</tr>
</thead>
<tbody class="tableBody">
      { 
          this.state.cacheUserListData.map((cacheuser, i) => {
    
  return<tr key={ i++}> <td>{i++}</td>
   <td>{cacheuser.userName}</td>
                  <td>{cacheuser.emailId}</td>
                  <td>{cacheuser.mobile}</td>
                 
                  <td>
                  <Button className="btn btn-primary" value={cacheuser.userName} onClick={this.approverUserChangeHandler}>
                  Approve
                   </Button>
                   </td>
                  </tr>
  })
}
</tbody>
</Table>


    </div>
  )
}
displayUserInfo(){
  return(
    <div>
<div className="col-md-12 is-Responsive formStyle form-scroll"> 
  <h2>Personal Information</h2>
    <form name="form">
                    <div   className="form-group">
                        <label htmlFor="userName"> Name: </label>
                        <input type="text" className="form-control" name="userName"  value={this.state.reponseViewInfo.firstName}>
                          
                          </input>
                      
                    </div>
                    <div   className="form-group">
                        <label htmlFor="authorized"> Middle Name: </label>
                        <input type="text" className="form-control" name="authorized"  value={this.state.reponseViewInfo.middleName}/>
                    </div>
                    <div   className="form-group">
                        <label htmlFor="emailId"> Last Name: </label>
                        <input type="text" className="form-control" name="lastName"   value={this.state.reponseViewInfo.lastName}/>
                    </div>
                    <div   className="form-group">
                        <label htmlFor="gender"> Gender: </label>
                        <input type="text" className="form-control" name="gender"   value={this.state.reponseViewInfo.gender} />
                    </div>
                    <div   className="form-group">
                        <label htmlFor="dob"> Datr of Birth: </label>
                        <input type="text" className="form-control" name="dob"   value={this.state.reponseViewInfo.dob}/>
                    </div>
                    <div   className="form-group">
                        <label htmlFor="mobile"> Mobile: </label>
                        <input type="text" className="form-control" name="mobile"  value={this.state.reponseViewInfo.mobile}/>
                    </div>
                    <div   className="form-group">
                        <label htmlFor="maritalstatus"> Marital Status </label>
                        <input type="text" className="form-control" name="maritalstatus"  value={this.state.reponseViewInfo.maritalstatus}/>
                    </div>
                    <div   className="form-group">
                        <label htmlFor="city"> City: </label>
                        <input type="text" className="form-control" name="city"  value={this.state.reponseViewInfo.city}/>
                    </div>
              
                    </form>
            </div>
           
          

    </div>

  )
}
    render(){
        let linkClose=()=>this.setState({
            createRolepopupShow:false 
        });
        let closePersonalInfoPopup=()=>this.setState({
            personalInfoShow:false,
            update:false
        });
        let closeAuthorizedPopup=()=>this.setState({
          AuthorizedShow:false
      });
      let closeViewPersonalInfoPopup=()=>this.setState({
        viewpersonalInfoShow:false
    });
    let closeregisterUserInfo = ()=> this.setState({
      registerUserInfo : false
    });
    let closecreateUserInfoList  = ()=> this.setState({
      createUserInfoList : false
    }); 
    let closeupdateAccessShow=()=>this.setState({
      updateAccessShow:false
    
  });
        const urlLink = () =>  {
          debugger;
          let showButton;
          if (this.state.disableCreateProfile) {
            showButton = '';
          } else {
            showButton = 
            <i class="fa fa-user-plus  fa-2x fa-style" aria-hidden="true"> 
              <Button className="btn btn-primary buttonStyleDashboard displayCreateProfile" onClick={()=>this.setState({personalInfoShow:true})}>
              Create Profile
            </Button>
            </i>
          }
            switch(this.state.userRole) {
            case 'access':
            return [
              showButton,
              <i class="fa fa-user  fa-2x fa-style" aria-hidden="true" >
  <Button className="btn btn-primary buttonStyleDashboard"  value = {this.state.userName} onClick={this.viewInfo}>
               View Info
               </Button>
               </i>,
              <PersonInfoPopUp 
              show={this.state.personalInfoShow} onHide={closePersonalInfoPopup} userName={this.state.userName} editUpdateUserName={this.state.editUpdateUsername}  update={false}/>,
              
              
             
              <Button className="btn btn-primary buttonStyleDashboard"  value = {this.state.userName} onClick={()=>this.setState({updateAccessShow:true})}>
              Update Profile
               </Button>,
                <UpdateAcessUser 
                show={this.state.updateAccessShow} onHide={closeupdateAccessShow} userName={this.state.userName} />
               
          
            ];
            case 'admin':
                  
                return [ 
                  showButton,
                <i class="fa fa-user  fa-2x fa-style" aria-hidden="true" >
                <Button className="btn btn-primary buttonStyleDashboard"  value = {this.state.userName} onClick={this.viewPersonalInfoHandler}>
                             View Info
                             </Button>
                             </i>
                             ,
               <PersonInfoPopUp 
               show={this.state.personalInfoShow} onHide={closePersonalInfoPopup} userName={this.state.userName} editUpdateUserName={this.state.editUpdateUsername}  update={this.state.update}/>,
         
                <RegisterationPopup 
                show={this.state.registerUserInfo} onHide={closeregisterUserInfo} userName={this.state.userName} role ={this.state.userRole} />,
                
               <i class="fa fa-plus fa-2x fa-style" aria-hidden="true"><Button className="btn btn-primary buttonStyleDashboard" onClick={()=>this.setState({createRolepopupShow:true})}>
         Create Role
        </Button>
        </i>,
       <i class="fa fa-user  fa-2x fa-style" aria-hidden="true" >
       <Button className="btn btn-primary buttonStyleDashboard"  value = {this.state.userName} onClick={this.userListHandler}>
                   Update User Profile
                    </Button>
                    </i>,
                    
               <Button className="btn btn-primary buttonStyleDashboard" onClick={()=>this.setState({registerUserInfo:true})}>
               Register User
              </Button>,
        <CreateRolePopup 
        show={this.state.createRolepopupShow} onHide={linkClose}/>,
             
        <Form.Group controlId="" className="classSelect">

        <Form.Control as="select"  className="classSelect" name="userType" onChange={this.handleChange}>
            <option >Users</option>
          <option>All User</option>
          <option >Un-Authorized</option>
          <option >Authorized</option>
         
     
        </Form.Control>
      </Form.Group>,

 <UserInfoList 
 show={this.state.createUserInfoList} onHide={closecreateUserInfoList} userName={this.state.userName} role ={this.state.userRole} click = {this.state.createUserInfoList} />,


               <Button className="btn btn-primary buttonStyleDashboard" onClick={this.persmissiomUserListHandler}>
Give Access Permission
</Button>
               
               ,
               <Button className="btn btn-primary buttonStyleDashboard" onClick={this.userRequestApproveHandler}>
               Approve User Request
               </Button>

        ];
            case 'operator':
                return [
                  showButton,
                  <i class="fa fa-user  fa-2x fa-style" aria-hidden="true" >
                  <Button className="btn btn-primary buttonStyleDashboard"  value = {this.state.userName} onClick={this.viewPersonalInfoHandler}>
                               View Info
                               </Button>
                               </i>
                               ,
                               <Button className="btn btn-primary buttonStyleDashboard" onClick={()=>this.setState({registerUserInfo:true})}>
               Register User
              </Button>,
               <RegisterationPopup 
               show={this.state.registerUserInfo} onHide={closeregisterUserInfo} userName={this.state.userName} role ={this.state.userRole} />,

               <PersonInfoPopUp 
               show={this.state.personalInfoShow} onHide={closePersonalInfoPopup} userName={this.state.userName} update={this.state.update}/>]
           ;
            default:
              return null;
          }
        }
        const showUsers =() =>{ debugger;
          if(this.state.responseAuthorizedUnData && this.state.userTypeSelectListClicked){
            return this.displayData();
          }else if(this.state.responsePersonalInfo &&  this.state.userInfoButtonClicked){
            return this.personalInfo();
          }
          else if(this.state.responseUserListData && this.state.updateUserListClicked ){
            return this.displayUserList();
          }else if( this.state.persmissionUserListData && this.state.persmissiomUserListClicked){
            return this.displayPermissionList();

          }else if(this.state.cacheUserListClicked && this.state.cacheUserListData){
            return this.displayCacheList();
          }else if (this.state.reponseViewInfo && this.state.viewInfoFlag){
            return this.displayUserInfo();
          }
        }
      
        return(
            <div className = "dashboardContainer">
            <Container>
            <Row className="dashboardHeaderStyle">
              <Col lg={12}>
                  <div>
                  <div className="logoutStyle">
                  <Link to="/ " className="btn create-btn-link">Logout</Link>
                  </div>
                  </div>
                  <div className="welcomeName">Welcome {this.state.userName},</div>
                  <div className="headerTitle Absolute-Center is-Responsive">Dashboard
                 
                  </div>
                  
                  <div className="dashMenuRight">
                
                    </div>
                </Col>
            </Row>
            <Row>
              <Col className="leftStyle" sm>
        <div className="menuStyle">
             {urlLink()} 
                  </div>
              </Col>
              <Col className="middleStyle" lg={8}>
              {showUsers()}
              </Col>
              <Col className="rightStyle" sm>
                <marquee direction = "up" className="marqueeStyle">Welcome {this.state.userName}, Your Role type is: {this.state.userRole}. </marquee>

              </Col>
            </Row>
          </Container>
          
    
        </div>
        )

        
    }
}
export default Dashboard;