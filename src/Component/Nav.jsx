import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    // State to manage menu visibility
    const [isOpen, setIsOpen] = useState(false);

    // Inline styles
    const styles = {
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            flexWrap: 'wrap',
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
        },
        nav: {
            display: 'flex',
            gap: '16px',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        navLink: {
            color: '#4A5568',
            textDecoration: 'none',
            padding: '10px',
            transition: 'color 0.3s',
        },
        navLinkHover: {
            color: '#D69E2E',
        },
        bookNowButton: {
            backgroundColor: '#D69E2E',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        bookNowButtonHover: {
            backgroundColor: '#B88C1A',
        },
        hamburger: {
            display: 'none',
            flexDirection: 'column',
            cursor: 'pointer',
            marginLeft: '20px',
        },
        bar: {
            height: '3px',
            width: '25px',
            backgroundColor: '#4A5568',
            margin: '3px 0',
        },
        mobileNav: {
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            width: '100%',
            position: 'absolute',
            top: '60px', // Position below the header
            left: '0',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 1000, // Ensure it's on top
        },
        mobileNavLink: {
            color: '#4A5568',
            textDecoration: 'none',
            padding: '10px',
            textAlign: 'center',
            borderBottom: '1px solid #ddd', // Separator for mobile links
        },
    };

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header style={styles.header}>
            <h1 style={styles.title}>Lairom</h1>
            <div style={styles.hamburger} onClick={toggleMenu}>
                <div style={styles.bar}></div>
                <div style={styles.bar}></div>
                <div style={styles.bar}></div>
            </div>
            <nav style={styles.nav}>
                <Link to="/LandingPage" style={styles.navLink}>Home</Link>
                <Link to="/Register" style={styles.navLink}>Register</Link>
                <Link to="/Login" style={styles.navLink}>Login</Link>
                <Link to="/Products" style={styles.navLink}>Product</Link>
                <Link to="/ProductForm" style={styles.navLink}>Product Form</Link>
            </nav>
            {/* Mobile Navigation */}
            <div style={styles.mobileNav}>
                <Link to="/LandingPage" style={styles.mobileNavLink} onClick={toggleMenu}>Home</Link>
                <Link to="/Register" style={styles.mobileNavLink} onClick={toggleMenu}>Register</Link>
                <Link to="/Login" style={styles.mobileNavLink} onClick={toggleMenu}>Login</Link>
                <Link to="/Products" style={styles.mobileNavLink} onClick={toggleMenu}>Product</Link>
            </div>
        </header>
    );
};

export default Nav;
