import React from 'react';
import Home from '../Home/Home';
import Scroll from '../Scroll/Scroll';
import { Card, Button } from 'react-bootstrap';

// import { Container, Row } from 'react-bootstrap';
import {MDBContainer, MDBCard, MDBCardBody, form, MDBBtn, MDBInput } from 'mdbreact';

class Event extends React.Component {
	constructor(props) {
		super();
		this.state = {
			eventt : '',

		}
		this.events = []
	}

	componentDidMount() {
	    this._isMounted = true;
	  	fetch('http://34.226.140.116:80/getevents',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body : JSON.stringify({
				user_id : this.props.userId
			})
		})
		.then(response => response.json())
		.then(data => {
			this.events = Object.values(data);
			
		}).then(result => {
			if(this._isMounted) {
				this.setState({isLoading:false})
			}
		});
	}

	componentWillUnmount() {
	    this._isMounted = false;
	}



	onEventChange = (event) => {
		this.setState({eventt:event.target.value})
	}

	onSubmit = () => {
		fetch('http://34.226.140.116:80/event',{
			method : 'post',
			headers : {'Content-Type':'application/json'},
			body : JSON.stringify({
				user_id : this.props.userId,
				event : this.state.eventt
			})
		}).then(response => response.json())
		.then(data => {
			this.props.onRouteChange('Home');
		})
	}

	render() {
		return(
		<div>
			<div>
				<Home signInEmail={this.props.signInEmail} onRouteChange={this.props.onRouteChange}/>
			</div>
			<br />
			<div>
				<Scroll>
				<MDBContainer >
					<MDBCard >
						<MDBCardBody>
						<form >
						<p className="h4 text-left py-4">/Events</p>
			            <hr />
			             <MDBInput onChange={this.onEventChange} type="textarea" label="Enter Event" outline />
			             <MDBBtn onClick={this.onSubmit} color="cyan" type="submit">Post</MDBBtn>
			            <hr/>
			            <h2>Events Posted by You</h2>
			            <hr/>
			            <div>
			            {
			            	this.events.map((object,i) => {
			            		return(
							        <div key={this.events[i].id}>
							        <Card>
									  <Card.Header>Event ID : {this.events[i].id}</Card.Header>
									  <Card.Body>
									    <Card.Title>Event Number {i}</Card.Title>
									    <Card.Text>
									      {this.events[i].event}
									    </Card.Text>
									    <Button variant="primary">Go somewhere</Button>
									  </Card.Body>
									</Card>
							        </div>
			            		);
			            	})
			            }
			            </div>
			            <div>
			            </div>
			             </form> 
						</MDBCardBody>
					</MDBCard>
				</MDBContainer>
				</Scroll>
			</div>
		</div>
		);
	}
}

export default Event;