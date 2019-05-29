import React from 'react';

const Scroll = (props) => {
	return(
		<div style={{overflowYX: 'scroll', height : '2000px'}}>
			{props.children}
		</div>
	);
}

export default Scroll;