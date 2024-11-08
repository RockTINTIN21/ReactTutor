import {Nav, Navbar} from "react-bootstrap";
import './Header.css';
import Logo from '../../assets/icons/Logo.png';
import gitLogo from '../../assets/icons/gitLogo.png';
import {useContext, useEffect} from "react";
import {ScreenSizeContext} from "../../contexts/ScreenSizeContext.jsx";
import useElementHeight from "../../hooks/useElementHeight.js";
function Header({isMainPage}){
    const [refNavbar,navbarHeight] = useElementHeight(null);
    const {setNavbarHeight} = useContext(ScreenSizeContext);
    useEffect(()=>{
        setNavbarHeight(navbarHeight)
    },[navbarHeight])
    return(
        <Navbar collapseOnSelect expand="lg" className={`container bg-transparent ${isMainPage && 'fixed-top'}`} ref={refNavbar}>
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
                    <Nav.Link href="#deets" className='ms-md-5'>Викторина</Nav.Link>
                    <Nav.Link href="#deets" className='ms-md-5'>Инструменты</Nav.Link>
                    <Nav.Link href="#deets" className='ms-md-5'>О проекте</Nav.Link>
                    <Nav.Link className="ms-md-5">
                        <img src={gitLogo} alt="gitLogo" style={{width:'2rem'}}/>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Header;