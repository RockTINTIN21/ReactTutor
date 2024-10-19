import {Container, Nav, Navbar} from "react-bootstrap";
import './Header.css';
import Logo from '../../assets/icons/Logo.png';
import gitLogo from '../../assets/icons/gitLogo.png';
function Header(){
    return(
        <>
            <Navbar collapseOnSelect expand="lg" className="pt-5">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt="ReactTutor"
                            src={Logo}
                            className="d-inline-block align-top "
                        />{' '}
                        ReactTutorAI
                    </Navbar.Brand>



                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Nav.Link href="#deets" className=''>О проекте</Nav.Link>
                            <Nav.Link href="#deets" className=''>Инструменты</Nav.Link>
                            <Nav.Link href="#deets" className=''>Викторина</Nav.Link>
                            <Nav.Link className='p-4'>
                                <img src={gitLogo} alt="ReactTutor"/>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;