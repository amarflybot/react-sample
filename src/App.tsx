import React, {useState} from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {BrowserRouter as Router} from "react-router-dom";
import {
    MDBCollapse, MDBContainer,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBNavLink
} from "mdbreact";
export function App() {

    const [collapse, setCollapse] = useState(false);

    function onClick() {
        setCollapse(!collapse);
    }
    const container = { height: 1300 }
    return (
        <div>
            <Router>
                <header>
                    <MDBNavbar color="default-color" dark expand="md">
                        <MDBNavbarBrand href="/">
                            <strong>Navbar</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={onClick} />
                        <MDBCollapse isOpen={collapse} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem active>
                                    <MDBNavLink to="#">Home</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="#">Features</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="#">Pricing</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="#">Opinions</MDBNavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBNavLink to="#"><MDBIcon fab icon="facebook-f" /></MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="#"><MDBIcon fab icon="twitter" /></MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="#"><MDBIcon fab icon="instagram" /></MDBNavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </header>
            </Router>
            <MDBContainer style={container} className="text-center mt-5">
                <h2>This Navbar isn't fixed</h2>
                <h5>When you scroll down it will disappear</h5>
            </MDBContainer>
        </div>
    );

}

export default App
