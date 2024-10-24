import Header from "../../components/Header/Header.jsx";
import VantaBackground from "../../components/VantaBackground/VantaBackground.jsx";
import styles from "./Home.module.css";
import largeLogo from '../../assets/icons/largeLogo.png';
import './Home.css';
import html from '../../assets/icons/html.jpg';
import {Button, Card, CardGroup, Carousel, Col, Row} from "react-bootstrap";
import {useState} from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

function Home(){
    return(
        <div className='home-container h-100'>
            <Helmet><title>ReactTutorAI</title></Helmet>
            <VantaBackground />
            <div className="content h-100">
                <Header/>
                <div className="main h-100 justify-content-center align-items-center d-flex flex-column">
                    <img src={largeLogo} alt="Logo"/>
                    <h1>React.TutorAI</h1>
                    <p>Личный помощник в изучении фронтенд-разработки.</p>
                    <div className="buttons d-md-flex w-50">
                        <Link to='/Chat' className='w-100 m-3'><Button className={`w-100 ${styles.buttonStart}`}>Начать изучение</Button></Link>
                        <Link to='/' className='w-100 m-3'><Button className={` w-100 ${styles.buttonStart}`}>О проекте</Button></Link>
                    </div>
                </div>
                {/*<div className="card-block  mt-5">*/}
                {/*    <h4 className='text-start'>С какими инструментами вам поможет React.TutorAI:</h4>*/}
                {/*    <Row xs={1} md={4} className="g-4 mt-1">*/}
                {/*        <Col>*/}
                {/*            <Card>*/}
                {/*                <Card.Img variant="top" src={html} />*/}

                {/*            </Card>*/}
                {/*        </Col>*/}
                {/*        <Col>*/}
                {/*            <Card>*/}
                {/*                <Card.Img variant="top" src="holder.js/100px160"/>*/}
                {/*            </Card>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</div>*/}


            </div>
        </div>
    );
}

export default Home;
