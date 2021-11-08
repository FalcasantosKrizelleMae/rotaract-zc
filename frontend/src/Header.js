import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import logo from './images/logo.png';
import './css/Navbar.css';
import { BiLogIn, BiLogOut, BiUser } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';

function Header() {
   let user = JSON.parse(localStorage.getItem('user-info'));
   const history = useHistory();
   function logOut() {
      localStorage.clear();
      history.push('/');
   }

   return (
      <div>
         <Navbar bg="light" expand="lg" sticky="top">
            <Container>
               <Navbar.Brand>
                  <img
                     src={logo}
                     width="100%"
                     height="50"
                     alt="Rotaract logo"
                  />
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="dropdown" />
               <Navbar.Collapse id="dropdown">
                  <Nav className="ms-auto">
                     {localStorage.getItem('user-info') ? (
                        <>
                           {/* <img
                    src={user && user.image}
                    width="40"
                    height="40"
                    className="user-img"
                    alt="Rotaract logo"
                  /> */}
                           <NavDropdown
                              id="nav-dropdown"
                              title={user && user.nickname}
                           >
                              <NavDropdown.Item onClick={logOut}>
                                 <BiLogOut color="#FA2F7D" /> &nbsp; Logout
                              </NavDropdown.Item>
                              <NavDropdown.Item>
                                 <BiUser color="#FA2F7D" />
                                 &nbsp; View profile
                              </NavDropdown.Item>
                           </NavDropdown>
                        </>
                     ) : (
                        <>
                           <Link to="/" className="nav-link">
                              HOME
                           </Link>
                           <Nav.Link className="nav-link">ABOUT</Nav.Link>

                           <NavDropdown title="CHAPTERS" id="nav-dropdown">
                              <NavDropdown.Item>Chapter 1</NavDropdown.Item>
                              <NavDropdown.Item>Chapter 2</NavDropdown.Item>
                              <NavDropdown.Item>Chapter 3</NavDropdown.Item>
                              <NavDropdown.Item>Chapter 4</NavDropdown.Item>
                              <NavDropdown.Item>Chapter 5</NavDropdown.Item>
                              <NavDropdown.Item>Chapter 6</NavDropdown.Item>
                              <NavDropdown.Item>Chapter 7</NavDropdown.Item>
                              <NavDropdown.Item>Chapter 8</NavDropdown.Item>
                           </NavDropdown>

                           <Link to="/register" className="nav-link">
                              Register
                           </Link>
                           <Link to="/login" className="nav-link">
                              Login &nbsp;
                              <BiLogIn color="#FA2F7D" />
                           </Link>
                        </>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </div>
   );
}

export default Header;
