import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import RegisterationPage from './UserRegistration/RegisterationPage';
import dashboard from './Dashboard/dashboard';



function App() {
  
  return (
    <div className="App">
  
     <Router>
                            <div>
                              
                                <Route exact path="/" component={LoginPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/registeration" component={RegisterationPage} />
                                <Route path="/dashboard" component={dashboard} />
                              
                              
                            </div>
                        </Router>
    
    </div>
  );
}

export default App;
