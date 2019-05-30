import React from 'react';
import Home from '../Home/Home';
import { withAlert } from 'react-alert';
import {MDBContainer, MDBCard, MDBCardBody, form } from 'mdbreact';
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
			fetch('http://34.226.140.116:80/sendMessage',{
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
	  		fetch('http://34.226.140.116:80/sendMail',{
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
						<input className='pa3 ba b--blue bg-black'
						type='text' 
						placeholder='Enter Number'
						onChange = {this.onNumberChange}
						/>
						<button 
						onClick={this.onSearchClick}
						style={{
							padding : '5px'
						}}
						>
						INVITE</button>
						<br/>
						<br/>
						<input className='pa3 ba b--blue bg-black'
						type='email' 
						placeholder='Enter Email '
						onChange = {this.onEmailChange}
						/>
						<button 
						onClick={this.onEmailSend}
						style={{
							padding : '5px'
						}}
						>INVITE</button>
						</form>
						</MDBCardBody>
					</MDBCard>
				</MDBContainer>

			</div>
		);
	}
}

export default withAlert()(Invite);