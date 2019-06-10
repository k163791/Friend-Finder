import React from 'react';
import Home from '../Home/Home';
import Scroll from '../Scroll/Scroll';
import { withAlert } from 'react-alert';
// import Footer from '../Footer/Footer';
// import { withAlert } from 'react-alert';
import {MDBContainer, MDBCard, MDBCardBody,form, MDBInput, MDBBtn } from 'mdbreact';
import { Row, Col, Image, Container } from 'react-bootstrap';

class Profile extends React.Component {

constructor(props) {
	super();
	this.state = {
		imge : 'https://i.redd.it/kfw12czosiv21.png',
		number : '',
		Name : '',
		Password : '',
		id : '',
		Email : ''
	}
}


// onEmailChange = (event) => {
// 	this.setState({Email : event.target.value})
// }

componentDidMount() {
	    this._isMounted = true;
	  	fetch('http://localhost:3001/getProfile',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body : JSON.stringify({
				id : this.props.userId
			})
		})
		.then(response => response.json())
		.then(data => {
			this.setState({Name : data.name});
			this.setState({Password : data.password});
			this.setState({number : data.phone_no});
			this.setState({Email : data.email});
		}).then(result => {
			if(this._isMounted) {
				this.setState({isLoading:false})
			}
		});
	}



onPhoneChange = (event) => {
	this.setState({number : event.target.value})
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

updateProfile = () => {
	fetch('http://localhost:3001/updateProfile',{
		method : 'post',
		headers : {'Content-Type' : 'application/json'},
		body : JSON.stringify({
			id : this.props.userId,
			email : this.state.Email,
			password : this.state.Password,
			name : this.state.Name,
			image : this.state.imge,
			phone_no : this.state.number
		})
	}).then(response => response.json())
	.then(data => {
		if(data === `Success`) {
			this.props.alert.show(`Profile Updated`);
		}
	})
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
    						
    						</Container>
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
	    						<MDBInput
	    							onChange={this.onPhoneChange} 
	    							label="Phone Number" 
	    							group type="text" 
	    							value={this.state.number} validate/>	
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

export default withAlert()(Profile);