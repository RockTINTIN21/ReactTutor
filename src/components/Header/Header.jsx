import {Container, Nav, Navbar} from "react-bootstrap";
import './Header.css';
import Logo from '../../assets/icons/Logo.png';
import gitLogo from '../../assets/icons/gitLogo.png';
import {useEffect, useRef, useState} from "react";
function Header(){
    const navbar = useRef(null);
    // const [navbar,setNavbar] = useState('');
    // useEffect(()=>{
    //
    //     // setNavbar(document.querySelector('.navbar').style.height);
    // },[])
    // useEffect(() => {
    //     if(navbar){
    //         const height = navbar.current.getBoundingClientRect().height;
    //         console.log('navbar',height);
    //         // console.log('navbar:',getComputedStyle(navbar.current).getPropertyValue('height'));
    //     }
    //
    // },[navbar])
    return(

            <Navbar collapseOnSelect className='p-0 m-0'>
                    <Navbar.Brand href="/" >
                        <img
                            alt="ReactTutor"
                            src={Logo}
                            className="d-inline-block"
                        />{' '}
                        React.TutorAI
                    </Navbar.Brand>
                    <Navbar.Toggle className='custom-toggler' aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className='p-0 test' >
                        <Nav className="me-auto"></Nav>
                        <Nav className='text-center '>
                            <Nav.Link href="#deets" className='ms-md-5  p-0'>Викторина</Nav.Link>
                            <Nav.Link href="#deets" className='ms-md-5  p-0'>Инструменты</Nav.Link>
                            <Nav.Link href="#deets" className='ms-md-5 p-0'>О проекте</Nav.Link>
                            <Nav.Link className="ms-md-5 p-0">
                                <img src={gitLogo} alt="gitLogo"/>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
    )
}
export default Header;