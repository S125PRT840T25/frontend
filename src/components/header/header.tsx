import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'; // Import Bootstrap components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Import user icon from FontAwesome
import './header.css';
import { useSelector } from 'react-redux';
import { RootState } from '@store';


export const Header = () => {
  const currentPage = useSelector((state: RootState) => state.navigationState.currentPage);
  
  return (
    <Navbar className="header">
      <Navbar.Brand href="#" className="left-title">{currentPage}</Navbar.Brand>
      <Nav className="ml-auto">
        <NavItem className="d-flex align-items-center">
          <FontAwesomeIcon icon={faUserCircle} size="lg" className="user-icon" />
          <span className="username ml-2">Glenn Maxwell</span>
        </NavItem>
      </Nav>
    </Navbar>
  );
};
