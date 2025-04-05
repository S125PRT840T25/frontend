import React, { useEffect } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faUser } from '@fortawesome/free-solid-svg-icons';
import './main-navigation.css';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '@slices';

const pages = [
    { path: '/upload-feedback', activeCheck: ['/', '/upload-feedback'], name: 'Upload Feedback', icon: faUpload },
    { path: '/about-us', activeCheck: ['/about-us'], name: 'About Us', icon: faUser },
];

export const MainNavigation = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    
    return (
        <div className="sidebar">
            <Navbar className="flex-column padding-top-0">
                <div className='page-layout-logo'>
                    <div className='large-first-letter'>Feedback</div>
                    <div className='large-first-letter margin-left-5'>Analyzer</div>
                </div>                
                <Nav className="flex-column padding-top-20 width-90-p">
                    {pages.map((page) => {                        
                        const isActive = page.activeCheck.some(p => location.pathname === p);
                        return (<NavItem key={page.path}>
                        <Nav.Link
                            as={NavLink}
                            to={page.path}
                            className={isActive ? "active-nav" : ""}
                            onClick={() => dispatch(setCurrentPage(page.name))}
                        >
                            <FontAwesomeIcon icon={page.icon} /> {page.name}
                        </Nav.Link>
                        </NavItem>
                    )})}
                </Nav>
            </Navbar>
        </div>
    );
}