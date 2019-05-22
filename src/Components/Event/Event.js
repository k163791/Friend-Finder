import React from 'react';
import Home from '../Home/Home';
import Scroll from '../Scroll/Scroll';
// import { Container, Row } from 'react-bootstrap';
import {MDBContainer, MDBCard, MDBCardBody, form, MDBBtn, MDBInput, MDBCol } from 'mdbreact';

class Event extends React.Component {
	constructor(props) {
		super();
		this.state = {
			eventt : ''
		}
		this.events = []
	}

	componentDidMount() {
	    this._isMounted = true;
	  	fetch('http://localhost:3001/getevents',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body : JSON.stringify({
				user_id : this.props.userId
			})
		})
		.then(response => response.json())
		.then(data => {
			this.events = Object.values(data);
			console.log(this.events);
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
		fetch('http://localhost:3001/event',{
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
			            {
			            	this.events.map((object,i) => {
			            		return(
			            			// <div key={this.events[i].id}>
			            			// <h3>Event ID : {this.events[i].id}</h3>
			            			// <p>{this.events[i].event}</p>
			            			// <br/>
			            			// </div>
			            // 			<div>
			            // 			 <MDBCol size="6">
							        //   <h3>Event ID : {this.events[i].id}</h3>
							        //   <br />
							        //   <p>{this.events[i].event}</p>
							        // </MDBCol>
							        // </div>
							        <div>
							         <h3>Event ID : {this.events[i].id}</h3>
							        <span className="d-block p-2 bg-primary text-white">
							        	{this.events[i].event}
							        </span>
							        </div>
			            		);
			            	})
			            }
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