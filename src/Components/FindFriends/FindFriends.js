import React from 'react';
import Home from '../Home/Home';
import Card from '../Card/Card';
import Scroll from '../Scroll/Scroll';
import { withAlert } from 'react-alert';
class FindFriends extends React.Component {
	constructor(props) {
		super();
		this.state = {
			searchBox : ''
		}
		this.users = []
	}

	componentDidMount() {
	    this._isMounted = true;
	  	fetch('http://34.226.140.116:80/getusers',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body : JSON.stringify({
				user_id : this.props.userId
			})
		})
		.then(response => response.json())
		.then(data => {
			this.users = Object.values(data);
		}).then(result => {
			if(this._isMounted) {
				this.setState({isLoading:false})
			}
		});
	}

	componentWillUnmount() {
	    this._isMounted = false;
	}

	onSearchChange = (event) => {
		var lower = event.target.value.toLowerCase();
		this.setState({searchBox:lower})
		console.log("Lower Case Search Box : ",this.state.searchBox);
	}

	onClickFriend = (friend) => {
		fetch('http://34.226.140.116:80/addFriend',{
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body : JSON.stringify({
				user_id : this.props.userId,
				friend : friend
			})
		}).then(response => response.json())
		.then(data => {
			if(data === 'Success') {
				this.props.alert.show(`Friend Added`);
			}
		})
	}

	onSearchClick = () => {
		if(this.state.searchBox.length === 0) {
			this.props.alert.show('Search Entity is Empty!');
		} else {
			fetch('http://34.226.140.116:80/getFilteredUsers',{
				method : 'post',
				headers : {'Content-Type':'application/json'},
				body : JSON.stringify({
					skill : this.state.searchBox,
					id : this.props.userId
				})
			}).then(response => response.json())
			.then(data => {
					// console.log(Object.values(data));
				this.users = Object.values(data);
				// console.log(this.users);
			}).then(result => {
			if(this._isMounted) {
				this.setState({isLoading:false})
			}
		});
		}
	}

	
	render() {
		return(
			<div>	
				<div>
					<Home onRouteChange={this.props.onRouteChange} signInEmail={this.props.signInEmail}/>
				</div>
				<br/>
				<div className='pa2'>
					<input className='pa3 ba b--blue bg-black'
						type='search' 
						placeholder='Search  By Skills'
						onChange = {this.onSearchChange}
					/>
					<br/>
					<button onClick={this.onSearchClick}>Search</button>
				</div>
				<br/>
				<Scroll>
				<div style={{
					display:'flex', 
					flexDirection:'row',
					flexWrap:'wrap',
					alignContent: 'space-around',
				    justifyContent: 'space-between'
				}}>
				{
					this.users.map((object,i) => {
						return(
							<div key={this.users[i].id}>
								<Card 
									user_id={this.users[i].id}
									image={this.users[i].image}
									userName={this.users[i].name}
									cardText={'Email : ' + this.users[i].email + 
											' Phone No : ' + this.users[i].phone_no}
									clickText={'Connect'}
									onClickFriend={this.onClickFriend}
								/>
							</div>
						);
					})
				}
				</div>
				</Scroll>
			</div>
		);
	}		

}

export default withAlert()(FindFriends);