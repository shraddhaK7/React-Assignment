import axios from 'axios'
import React from 'react';
import Table from 'react-bootstrap/Table'

export class AllUserResultPage extends React.Component{
    constructor(props){
        super(props);
       
        this.state = {
        
            responseData:[]
        };
    }
      
       
    componentDidMount() {
       this.fetchData();

    }
    fetchData(){
        debugger;
        const that = this;
        const userType ="Yes";
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
         
        axios.post('http://localhost:8080/getUserType',userType, axiosConfig)
        .then(function (response) { 
           
          if(response.status === 200){
              console.log(JSON.stringify(response.data));
              
              that.setState({ responseData: response.data });
          }else{
            alert("Please try again later.");
       }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render(){
    
        const t ="No";
        return(
            
          <div>
          {this.state.userType}
          <Table striped bordered hover size="sm">
   <thead>
     <tr>
       <th>#</th>
       <th>User Name</th>      <th>Email Id</th>
      <th>Authorization Status</th>
      {
        
          

          
          t === "No" ? (
        <th>Authorize</th>
      ) : ""}
      
     </tr>
   </thead>
   <tbody>
            { 
                this.state.responseData.map((user, i) => {
				  
				return<tr key={ i}> <td>{user.uid}</td>
				 <td>{user.userName}</td>
                        <td>{user.emailId}</td>
                        <td>{user.authorized}</td>
				
                </tr>
        })
      }
      </tbody>
            

      </Table>
    

          </div>

        )
        
    }

}
