import React from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'

/*
,FormControl,Form,Button
*/
const Home = ({ onRouteChange, signInEmail }) => {
	return(
	<div>
		<div>
			<h1 className='f2' style={{display:'flex',justifyContent:'left',color:'white'}}>Friend Finder</h1>
		</div>
		<div>
		<Navbar bg="dark" variant="dark">
		    <Navbar.Brand href="#home" onClick={()=>onRouteChange('Home')}>Friend Finder</Navbar.Brand>
		    <Nav className="mr-auto">
		      <Nav.Link href="#home" onClick={()=>onRouteChange('Home')}>Home</Nav.Link>
		      <Nav.Link href="#friends" onClick={()=>onRouteChange('Friends')}>Friends</Nav.Link>
		      <Nav.Link href="#event" onClick={()=>onRouteChange('Event')}>Events</Nav.Link>
		      <Nav.Link href="#skill" onClick={()=>onRouteChange('Skill')}>Skills</Nav.Link>
		      <Nav.Link href="#find" onClick={()=>onRouteChange('Find')}>Find</Nav.Link>
		      <Nav.Link href="#map" onClick={()=>onRouteChange('Map')}>Map</Nav.Link>
		      <Nav.Link href="#invite" onClick={()=>onRouteChange('Invite')}>Invite</Nav.Link>
		    </Nav>
		    {
		    /*<Form inline>
		      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
		      <Button variant="outline-info">Search</Button>
		    </Form>*/
			}
			<NavDropdown title={signInEmail} id="basic-nav-dropdown">
		        <NavDropdown.Item onClick={()=>onRouteChange('Profile')} href="#action/3.1">Profile</NavDropdown.Item>
		        <NavDropdown.Divider />
		        <NavDropdown.Item onClick={()=>onRouteChange('Login')} href="#action/3.4">Logout</NavDropdown.Item>
		     </NavDropdown>
		  </Navbar>
		</div>
	</div>
	);
}

export default Home;