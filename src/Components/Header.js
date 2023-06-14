import React from "react";
import { Navbar, NavbarBrand } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar style={{backgroundColor: 'rgb(11, 94, 215)', position: 'sticky', top: '0'}}>
            <NavbarBrand className="mx-4" style={{fontWeight: 'bold'}}>Mail Box - Client</NavbarBrand>
        </Navbar>
    )
}

export default Header;