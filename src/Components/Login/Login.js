import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn,MDBCard,MDBCardBody } from 'mdbreact';
import { withAlert } from 'react-alert';

class Login extends React.Component {

constructor(props) {
  super();
  this.style = {
    position : 'absolute',
    top : '20%',
    left : '30%',
  }

  this.state = {
    email: '',
    password : ''
  }
} 

onEmailChange = (event) => {
  this.setState({email:event.target.value})
} 

onPasswordChange = (event) => {
  this.setState({password:event.target.value})
} 

onSubmit = () => {
  fetch('http://localhost:3001/login',{
    method : 'post',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify({
      email : this.state.email,
      password : this.state.password
    })
  }).then(response => response.json())
  .then(data => {
    if(data === `Couldn't Signin`) {
      console.log(data);
      this.props.alert.show(`Incorrect Login Credentials`);
    } else {
      this.props.setEmail(this.state.email);
      this.props.alert.show(`Logged In`);
      this.props.onRouteChange('Home');
    }
  })
}

render() {
    return (
    <div>
    <MDBContainer style={this.style}>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Login</p>
                <div className="grey-text">
                  <MDBInput
                    onChange={this.onEmailChange}
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  
                  <MDBInput
                    onChange={this.onPasswordChange}
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn
                    onClick={this.onSubmit} 
                    color="cyan" >
                    Login
                  </MDBBtn>
                </div>
                <br />
                 <MDBCol md="6">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Don't Have an account ?
                    <a onClick={()=>this.props.onRouteChange('SignUp')} href="#!" className="blue-text ml-1">
                      Signup
                    </a>
                  </p>
                </MDBCol>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
}


};

export default withAlert()(Login);