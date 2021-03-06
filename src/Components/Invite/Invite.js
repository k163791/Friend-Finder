import React from 'react';
import Home from '../Home/Home';
import { withAlert } from 'react-alert';
import {MDBContainer, MDBCard, MDBCardBody, form, MDBInput, MDBBtn } from 'mdbreact';
class Invite extends React.Component {
	constructor(props) {
		super();
		this.state = {
			number : '',
			email : ''
		}
	}

	onNumberChange = (event) => {
		this.setState({number:event.target.value});
		console.log(this.state.number);
	}

	onSearchClick = () => {
		console.log(this.state.number.length);
		if(this.state.number.length === 0 ) {
			this.props.alert.show(`Enter Entity Empty`);	
		} else if(this.state.number.length > 11 || this.state.number.length < 11) {
			this.props.alert.show(`Enter a valid Number`);
		} else if(this.state.number.length === 11) {
			fetch('http://localhost:3001/sendMessage',{
				method : 'post',
				headers : {'Content-Type' : 'application/json'}
			}).then(response => response.json())
			.then(data => {
				console.log(data);
			})
			this.props.alert.show(`Invitation Sent`);
		}
	}

	onEmailChange = (event) => {
		this.setState({email:event.target.value})
		console.log(this.state.email);
	}

	onEmailSend = () => {
		console.log(this.state.email);
		if(this.state.email.length < 5) {
	    this.props.alert.show(`Email is too short`);
	  	}
	  	if(this.state.email.split("").filter(x => x === "@").length !== 1) {
	    this.props.alert.show(`Enter a valid Email`);
	  	}
	  	if(this.state.email.indexOf(".") === -1) {
	    this.props.alert.show(`Enter a valid Email`);
	  	} else {
	  		fetch('http://localhost:3001/sendMail',{
	  			method : 'post',
	  			headers : {'Content-Type' : 'application/json'},
	  			body : JSON.stringify({
	  				email : this.state.email
	  			})
	  		}).then(response => response.json())
	  		.then(data => console.log(data))
	  		this.props.alert.show('Email Invitation Sent');
	  	}
	}

	render() {
		return(
			<div>
				<div>
					<Home onRouteChange={this.props.onRouteChange} signInEmail={this.props.signInEmail} />
				</div>
				<br/>
				<MDBContainer >
					<MDBCard >
						<MDBCardBody>
						<form >
						<p className="h4 text-left py-4">/Invite Friends</p>
						<hr/>
						<MDBInput onChange={this.onNumberChange} type="text" label="Enter Number" outline />
						<MDBBtn onClick={this.onSearchClick} color="cyan">INVITE</MDBBtn>
						<br/>
						<br/>
						<MDBInput onChange={this.onEmailChange} type="text" label="Enter Email" outline />
						<MDBBtn onClick={this.onEmailSend} color="cyan">INVITE</MDBBtn>
						
						</form>
						</MDBCardBody>
					</MDBCard>
				</MDBContainer>

			</div>
		);
	}
}

export default withAlert()(Invite);