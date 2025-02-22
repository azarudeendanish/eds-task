import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router';

function Header() {
  const [session, setSession] = useState(localStorage.getItem('email'))
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Link className='navbar-brand' to='/'><i className="fas fa-arrow-left me-4"></i>Create New Invoice</Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="m-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav variant="underline" defaultActiveKey="#vendor">
              <Nav.Item>
                <Nav.Link href="#vendor">Vendore Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='#invoice' eventKey="#invoice">Invoice Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='#comments' eventKey="#comments">Comments</Nav.Link>
              </Nav.Item>
            </Nav>
          </Nav>
          <Button onClick={handleLogout} variant="btn btn-danger">Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;