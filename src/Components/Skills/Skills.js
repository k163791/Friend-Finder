import React from 'react';
import Home from '../Home/Home';
import Scroll from '../Scroll/Scroll';
import { Card } from 'react-bootstrap';
import { withAlert } from 'react-alert';
import {MDBContainer, MDBCard, MDBCardBody, form, MDBInput, MDBBtn } from 'mdbreact';
class Skills extends React.Component {
	constructor(props) {
		super();
		this.skills = [];
		this.state = {
			enterSkill : ''
		}
	}

	componentDidMount() {
	    this._isMounted = true;
	  	fetch('http://34.226.140.116:80/getSkills',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body : JSON.stringify({
				user_id : this.props.userId
			})
		})
		.then(response => response.json())
		.then(data => {
			this.skills = Object.values(data);
		}).then(result => {
			if(this._isMounted) {
				this.setState({isLoading:false})
			}
		});
	}

	componentWillUnmount() {
	    this._isMounted = false;
	}


	onSkillChange = (event) => {
		var lower = event.target.value.toLowerCase();
		this.setState({enterSkill:lower});
		console.log(this.state.enterSkill)
	}

	onAddSkill = () => {
		fetch('http://34.226.140.116:80/addSkill',{
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body : JSON.stringify({
				user_id : this.props.userId,
				skill : this.state.enterSkill
			})
		}).then(response => response.json())
		.then(data => {
			if( data === 'Success') {
				this.props.alert.show(`Skill Added`);	
				this.props.onRouteChange(`Home`);
			}
		})
	}

	render() {
		return(
		<div>
			<div>
				<Home onRouteChange={this.props.onRouteChange} signInEmail={this.props.signInEmail}/>
			</div>
			<br/>
			<Scroll>
			<MDBContainer >
					<MDBCard >
						<MDBCardBody>
						<form >
						<p className="h4 text-left py-4">/Your Skills</p>
						<hr/>
						<div>
						{
							this.skills.map((object,i)=>{
								return(
									<div key={this.skills[i].id}>
										<Card>
									  		<Card.Body>{this.skills[i].skill}</Card.Body>
										</Card>
									</div>
								);
							})

						}
						</div>
						<hr/>
						<p className="h4 text-left py-4">/Add Skills</p>
						<hr/>
						<div>
						<MDBInput 
							onChange={this.onSkillChange} 
							type="textarea" 
							label="Enter Skill" outline />
			             <MDBBtn onClick={this.onAddSkill} color="cyan" type="submit">Submit</MDBBtn>
						</div>
						</form>
						</MDBCardBody>
					</MDBCard>
			</MDBContainer>
			</Scroll>
		</div>
		);
	}
}

export default withAlert()(Skills);