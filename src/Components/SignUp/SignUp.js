import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody ,form} from 'mdbreact';
import { withAlert } from 'react-alert';
class SignUp extends React.Component {

constructor(props) {
  super();
  this.style = {
    position : 'absolute',
    top : '20%',
    left : '30%',
  }
  this.state = {
    name : '',
    email : '',
    password : '',
    phoneNo : ''
  }
} 


onPhoneChange = (event) => {
  this.setState({phoneNo:event.target.value})
}

onNameChange = (event) => {
  this.setState({name:event.target.value})
}

onEmailChange = (event) => {
  this.setState({email:event.target.value})  
}

onPasswordChange = (event) => {
  this.setState({password:event.target.value})
}


validate = () => {
  if(this.state.password.length === 0) {
    this.props.alert.show(`Password Not Entered`);
    return 0;
  }
  if(this.state.name.length === 0) {
    this.props.alert.show(`Name can't be empty`);
    return 0;
  }
  if(this.state.email.length < 5) {
    this.props.alert.show(`Email is too short`);
    return 0;
  }
  if(this.state.email.split("").filter(x => x === "@").length !== 1) {
    this.props.alert.show(`Enter a valid Email`);
    return 0;
  }
  if(this.state.email.indexOf(".") === -1) {
    this.props.alert.show(`Enter a valid Email`);
    return 0;
  }
  return 1;

}


onButtonSubmit = () => {
  const check = this.validate();
  if(check === 1) {
    fetch('http://localhost:3001/register',{
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({
        name : this.state.name,
        email : this.state.email,
        phone_no : this.state.phoneNo,
        password : this.state.password
      })
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      if(data === `Couldn't Register`) {
        this.props.alert.show(`Couldn't Register`);
      } else {
        this.props.onRouteChange('Home')
        this.props.setEmail(this.state.email);
      }
    })
  }
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
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    onChange={this.onNameChange}
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    onChange={this.onPhoneChange}
                    label="Your Phone Number"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
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
                  <MDBBtn onClick={this.onButtonSubmit} color="cyan" type="submit">
                    Register
                  </MDBBtn>
                </div>
                <br />
                 <MDBCol md="6">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Have an account ?
                    <a onClick={()=>this.props.onRouteChange('Login')} href="#!" className="blue-text ml-1">
                      Login
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

export default withAlert()(SignUp);