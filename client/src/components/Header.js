import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from '../auth/AuthContext'
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  let { userLogout,role_id, logged } = props;
  return (
    <AuthContext.Consumer>
      {(context) => (
     
        <Navbar className="navbar navbar-dark bg-dark" expand="sm" fixed="top">

          <Navbar.Brand >
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-book" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M1 2.828v9.923c.918-.35 2.107-.692 3.287-.81 1.094-.111 2.278-.039 3.213.492V2.687c-.654-.689-1.782-.886-3.112-.752-1.234.124-2.503.523-3.388.893zm7.5-.141v9.746c.935-.53 2.12-.603 3.213-.493 1.18.12 2.37.461 3.287.811V2.828c-.885-.37-2.154-.769-3.388-.893-1.33-.134-2.458.063-3.112.752zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            <> </>
         Learning Platform
        </Navbar.Brand>

          <Nav className="mr-auto">
            {context.authUser && role_id==5 && logged &&
              <Nav.Link as={NavLink} to="/student"  >My teaching load</Nav.Link>
            }
            {
              context.authUser && role_id==4 && logged &&
              <Nav.Link as={NavLink} to="/teacher"  >My courses</Nav.Link>
            }


          </Nav>


          <Nav className="ml-md-auto">
            {context.authUser &&
              <>
              {logged &&<>
                <Navbar.Brand>Welcome {context.authUser.nome}!</Navbar.Brand>
                <Nav.Link onClick={userLogout}>Logout</Nav.Link></>}
              </>}
            {!context.authUser && <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}
            <Nav.Link href="#">
              <svg className="bi bi-people-circle" width="30" height="30" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
                <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd" />
              </svg>
            </Nav.Link>
          </Nav>
        </Navbar>
      )}
    </AuthContext.Consumer>

  );
}

export default Header;
