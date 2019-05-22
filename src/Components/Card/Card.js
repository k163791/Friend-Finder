import React from 'react';
import { Card,Button } from 'react-bootstrap';

const Cards = () => {

	return(
		<div style={{width:'300px'}}>
		<Card >
			<Card.Img style={{height:'200px'}}
				  variant="top" 
				  src=''
				  alt='teamImage' />
			<Card.Body>
				<Card.Title>This is a Test</Card.Title>
				<Card.Text>
				   Testing
				</Card.Text>
				<Button variant="primary">Click Me</Button>
			</Card.Body>
		</Card>
		</div>
	);

}

export default Cards;