import React from 'react';
import Home from '../Home/Home';
import Scroll from '../Scroll/Scroll';
// import Footer from '../Footer/Footer';
// import { withAlert } from 'react-alert';
import {MDBContainer, MDBCard, MDBCardBody,form, MDBInput, MDBBtn } from 'mdbreact';
import { Row, Col, Image, Container } from 'react-bootstrap';

class Profile extends React.Component {

constructor(props) {
	super();
	this.state = {
		imge : 'https://i.redd.it/kfw12czosiv21.png',
		Email : '',
		Name : '',
		Password : '',
		id : ''
	}
}


// onEmailChange = (event) => {
// 	this.setState({Email : event.target.value})
// }

onEmailChange = (event) => {
	this.setState({Email : event.target.value})
}

onNameChange = (event) => {
	this.setState({Name : event.target.value})
}

onPasswordChange = (event) => {
	this.setState({Password : event.target.value})
}



changePicture = (event) => {
	let formData = new FormData();
	formData.append('image',event.target.value);
	console.log(formData);
}

render() {
	return(
		<div>
			<Home onRouteChange={this.props.onRouteChange} signInEmail={this.props.signInEmail}/>
			<br />
			<Scroll >
			<MDBContainer >
					<MDBCard >
						<MDBCardBody>
						<form >
			                <p className="h4 text-left py-4">/Profile</p>
			                <hr />
			                <Container>
							  <Row>
							    <Col xs={6} md={4}>
							      <Image style={{height:'200px'}} src={this.state.imge} rounded />
    							</Col>
    						   </Row>
    							{ 
    								// <input onChange={this.changePicture} type="file" name="picture" />
    							}
    						<MDBBtn onClick={this.uploadFile} color="cyan" type="submit">Update Profile Image</MDBBtn>
    						</Container>
    							<MDBInput 
    								onChange={this.onEmailChange} 
    								label="Email" 
    								group type="text" 
    								value={this.state.Email} validate/>
	    						<MDBInput
	    							onChange={this.onNameChange} 
	    							label="Name" 
	    							group type="text" 
	    							value={this.state.Name} validate/>
	    						<MDBInput
	    							onChange={this.onPasswordChange} 
	    							label="Password" 
	    							group type="Password" 
	    							value={this.state.Password} validate/>
	    						
	    					<hr />
	    					<MDBBtn onClick={this.updateProfile} color="cyan" type="submit">Update Profile</MDBBtn>
			             </form>  
						</MDBCardBody>
					</MDBCard>
			</MDBContainer>
			</Scroll>
		</div>
	);
}
	
}

export default Profile;