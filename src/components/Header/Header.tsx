import {Nav, Navbar} from "react-bootstrap";
import './Header.css';
import Logo from '../../assets/icons/Logo.png';
import gitLogo from '../../assets/icons/gitLogo.png';
import {useContext, useEffect} from "react";
import {ScreenSizeContext} from '../../contexts/ScreenSizeContext.tsx';
import useElementHeight from "../../hooks/useElementHeight.ts";
import {Link} from "react-router-dom";
import React from "react";

type HeaderType = {
    isMainPage: boolean,
}

function Header({isMainPage}:HeaderType) {
    const [refNavbar,navbarHeight] = useElementHeight();
    const {setNavbarHeight} = useContext(ScreenSizeContext)!;
    useEffect(()=>{
        setNavbarHeight(navbarHeight)

    },[navbarHeight])
    return(
        <Navbar collapseOnSelect expand="lg" className={`container  ${isMainPage && 'fixed-top ps-3 pe-3'}`} ref={refNavbar}>
            <Navbar.Brand href="/">
                <img
                    alt="ReactTutor"
                    src={Logo}
                    className="d-inline-block"
                />{' '}
                React.TutorAI
            </Navbar.Brand>
            <Navbar.Toggle className='custom-toggler' aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav className='text-center'>
                    <Link to='/Chat'><Nav.Link href="#deets" className='ms-md-5'>Чат</Nav.Link></Link>
                    <Link to='/notfound'><Nav.Link href="#deets" className='ms-md-5'>Инструменты</Nav.Link></Link>
                    <Link to='/notfound'><Nav.Link href="#deets" className='ms-md-5'>О проекте</Nav.Link></Link>
                    <Nav.Link className="ms-md-5" href='https://github.com/RockTINTIN21/ReactTutor'>
                        <img src={gitLogo} alt="gitLogo" style={{width:'2rem'}}/>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Header;