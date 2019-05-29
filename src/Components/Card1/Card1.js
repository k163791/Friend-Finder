import React from 'react';
import { Card } from 'react-bootstrap';

const Cards = (props) => {

	return(
		<div style={{width:'300px'}}>
		<Card >
			<Card.Img style={{height:'200px'}}
				  variant="top" 
				  src={props.image}
				  alt='User Image' />
			<Card.Body>
				<Card.Title>{props.userName}</Card.Title>
				<Card.Text>
				   {props.cardText}
				</Card.Text>
				{//<Button variant="primary">{props.clickText}</Button>
			}
			</Card.Body>
		</Card>
		</div>
	);

}

export default Cards;