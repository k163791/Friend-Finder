import React from 'react';
import Leaflet from '../Leaflet/Leaflet';
import Home from '../Home/Home';
import Scroll from '../Scroll/Scroll';
class Mapp extends React.Component {
	constructor(props){
		super();
		this.state = {

		}
	}
	render () {
		return(
			<div>
				<div>
					<Home onRouteChange={this.props.onRouteChange} signInEmail={this.props.signInEmail} />
				</div>
				<br/>
				<Scroll>
				<div>
					<Leaflet userId={this.props.userId}/>
				</div>
				</Scroll>
			</div>
		);
	}


}

export default Mapp;