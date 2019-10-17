import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap';


export class DisplayData extends React.Component{
    constructor(props) {
        alert('hiiii');
        super(props);
        this.state = {  personalInfoShow: false, update : false,  editUpdateUsername : false

        }
        this.userListHandler = this.userListHandler.bind(this);
      }
      componentDidMount(){
          alert('mount');
      }

      userListHandler(){
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

       
render() {
    console.log("sdfsdf--------------------------------------")
return (
    
    <div>

    <Table striped bordered hover size="sm" className= "Usertable">
<thead>
<tr>
 <th>#</th>
 <th>User Name</th>      
 <th>Email Id</th>
<th>Create/Edit</th>
{
this.state.Authorization === "No" ? (
<th>Authorize</th>
) : ""}
</tr>
</thead>
<tbody class="tableBody">
      { 
          this.state.responseUserListData.map((user, i) => {
    
  return<tr key={ i}> <td>{i}</td>
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

}