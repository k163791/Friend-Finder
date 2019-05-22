import React from 'react';
import Home from '../Home/Home';
// import { Container, Row} from 'react-bootstrap';
import {MDBContainer, MDBCard, MDBCardBody,form } from 'mdbreact';
import Card from '../Card/Card';
const Friends = ({onRouteChange}) => {
	const style = {
		margin : '0',
		border : '0',
		padding : '0'
	}
	return(
		<div>
			<div>
				<Home onRouteChange={onRouteChange}/>
			</div>
			<br />
			<div style={style}>
				<MDBContainer >
					<MDBCard >
						<MDBCardBody>
						<form >
						<p className="h4 text-left py-4">/Friends</p>
			            <hr />
			            <Card />
			             </form>  
						</MDBCardBody>
					</MDBCard>
				</MDBContainer>
			</div>
		</div>
	);
}

export default Friends;