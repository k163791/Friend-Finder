import React, { Component } from 'react';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Profile from './Components/Profile/Profile';
import Event from './Components/Event/Event';
import Friends from './Components/Friends/Friends';
import FindFriends from './Components/FindFriends/FindFriends';
import Skills from './Components/Skills/Skills';
import Invite from './Components/Invite/Invite';
import Mapp from './Components/Mapp/Mapp';
// import '/Mapp/dist/Mapp.css';

// import Mapp from './Components/Mapp/Mapp';
// import Find from './Components/Find/Find';
import './App.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap-css-only/css/bootstrap.min.css';

/*
Components To Make : 
1.Home
2.SignUp
3.Login
4.Profile
5.Skills
6.Event
*/

class App extends Component {
constructor() {
  super();
  this.state = {
    route : 'Login',
    signInEmail : '',
    userId : ''
  }
}

onRouteChange = (route) => {
  this.setState({route:route});
}

setEmail = (email) => {
  this.setState({signInEmail:email})
  this.setID(email);
}

setID = (email) => {
  fetch('http://34.226.140.116:80/retrieveID',{
    method : 'post',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify({
      email : email
    })
  }).then(response => response.json())
  .then(data => {
    this.setState({userId:data.id})
    console.log(this.state.userId);
  })
}

chooseComponent = () => {
  if(this.state.route === 'Login') {
    return(
    <div>
      <h1>Friend Finder App</h1> 
      <Login setEmail={this.setEmail} onRouteChange={this.onRouteChange}/>
    </div>
    );
  } else if(this.state.route === 'SignUp') {
    return (
      <div>
        <h1>Friend Finder App</h1>
        <SignUp
          setEmail={this.setEmail} 
          onRouteChange={this.onRouteChange}
        />
      </div>
    );
  } else if(this.state.route === 'Home') {
    return <Home signInEmail={this.state.signInEmail} onRouteChange={this.onRouteChange}/>
  } else if(this.state.route === 'Profile') {
      return <Profile signInEmail={this.state.signInEmail} onRouteChange={this.onRouteChange} userId={this.state.userId}/>
  } else if(this.state.route === 'Event') {
      return <Event userId={this.state.userId} signInEmail={this.state.signInEmail} onRouteChange={this.onRouteChange}/>
  } else if(this.state.route === 'Friends') {
    return <Friends onRouteChange={this.onRouteChange} signInEmail={this.state.signInEmail} userId={this.state.userId}/>
   } else if(this.state.route === 'Find') {
    return <FindFriends onRouteChange={this.onRouteChange} signInEmail={this.state.signInEmail} userId={this.state.userId}/>
   } else if(this.state.route === 'Skill') {
    return <Skills userId={this.state.userId} onRouteChange={this.onRouteChange} signInEmail={this.state.signInEmail}/>
   } else if(this.state.route === 'Invite') {
      return <Invite onRouteChange={this.onRouteChange} signInEmail={this.state.signInEmail} userId={this.state.userId}/>
   } else if(this.state.route === 'Map') {
      return <Mapp onRouteChange={this.onRouteChange} signInEmail={this.state.signInEmail} userId={this.state.userId}/>
   }
  // else {
  //   return(
  //   <div>
  //       <h1>Friend Finder App</h1> 
  //     <Login setEmail={this.setEmail} onRouteChange={this.onRouteChange}/>
  //   </div>
  //   );
  // }
}


  render() {
    return (
      <div className="App">
        {this.chooseComponent()}
      </div>
    );
  }
}

export default App;
