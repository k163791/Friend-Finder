import React from 'react';
import Home from '../Home/Home';
import Scroll from '../Scroll/Scroll';
// import { Container, Row} from 'react-bootstrap';
import {MDBContainer, MDBCard, MDBCardBody,form } from 'mdbreact';
import Card from '../Card1/Card1';
class Friends extends React.Component{

	constructor() {
		super();
		this.style = {
			margin : '0',
			border : '0',
			padding : '0'
		}

		this.friends = [];
	}


	componentDidMount() {
	    this._isMounted = true;
	  	fetch('http://34.226.140.116:80/getFriends',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body : JSON.stringify({
				user_id : this.props.userId
			})
		})
		.then(response => response.json())
		.then(data => {
			this.friends = Object.values(data);
		}).then(result => {
			if(this._isMounted) {
				this.setState({isLoading:false})
			}
		});
	}

	componentWillUnmount() {
	    this._isMounted = false;
	}
	
	render() {
		return(
		<div>
			<div>
				<Home onRouteChange={this.props.onRouteChange} signInEmail={this.props.signInEmail}/>
			</div>
			<br />
			<div style={this.style}>
				<MDBContainer >
					<MDBCard >
						<MDBCardBody>
						<form >
						<p className="h4 text-left py-4">/Friends</p>
			            <hr />
			       		<Scroll>
						<div style={{
							display:'flex', 
							flexDirection:'row',
							flexWrap:'wrap',
							alignContent: 'space-around',
						    justifyContent: 'space-between'
						}}>
						{
							this.friends.map((object,i) => {
								return(
									<div key={this.friends[i].id}>
										<Card 
											user_id={this.friends[i].id}
											image={this.friends[i].image}
											userName={this.friends[i].name}
											cardText={'Email : ' + this.friends[i].email + 
													' Phone No : ' + this.friends[i].phone_no}
										/>
									</div>
								);
							})
						}
						</div>
						</Scroll>
			             </form>  
						</MDBCardBody>
					</MDBCard>
				</MDBContainer>
			</div>
		</div>
	);
	}	
}

export default Friends;