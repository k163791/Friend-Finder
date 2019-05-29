import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { withAlert } from 'react-alert';
const style = {
  width: "1550px",
  height: "500px"
};

class Leaflet extends React.Component {
		
	constructor(props) {
		super();
		this.state = {
			lati : '24.9141',
			long : '67.1075'
		}
	}

	componentDidMount() {
	this.map = L.map('map', {
      center: [this.state.lati, this.state.long],
      zoom: 14,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
	});

	var greenIcon = L.icon({
	    iconUrl: 'https://i.redd.it/4f7kdufepw031.png',
	    shadowUrl: null,

	    iconSize:     [38, 50], // size of the icon
	    shadowSize:   [50, 64], // size of the shadow
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    shadowAnchor: [4, 62],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	var coord,lat,lng;
	var myMarker = L.marker([this.state.lati, this.state.long],{icon: greenIcon,title: "MyPoint", alt: "The Big I", draggable: true})
		.addTo(this.map)
		.on('dragend', function() {
			coord = String(myMarker.getLatLng()).split(',');
			lat = coord[0].split('(');
			this.setState({lati:lat[1]});
			lng = coord[1].split(')');
			this.setState({long:lng[0]});
			myMarker.bindPopup("Moved to: " + lat[1] + ", " + lng[0] + ".").openPopup();
		}.bind(this))	
}

	setLoc = () => {
		fetch('http://localhost:3001/setLocation',{
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body : JSON.stringify({
				latitude : this.state.lati,
				longitude : this.state.long,
				user_id : this.props.userId
			})
		}).then(response => response.json())
		.then(data => {
			if(data === 'Success') {
				this.props.alert.show(`Location Has Been Set`)
			} else {
				this.props.alert.show(`Location Couldn't be set, try again`);
			}
		})
	}

	render() {
		return(
			<div>
				<div id="map" style={style}>		
				</div>
				<br/>
				<button
					style={{
						padding : '20px'
					}}
					onClick={this.setLoc}
				>Set Location</button>
			</div>
		);
	}
}

export default withAlert()(Leaflet);