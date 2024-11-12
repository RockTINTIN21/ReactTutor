import Header from "../../components/Header/Header.tsx";
// @ts-ignore
import VantaBackground from "../../components/VantaBackground/VantaBackground.tsx";
import styles from "./Home.module.css";
import largeLogo from '../../assets/icons/largeLogo.png';
import './Home.css';
import {Button} from "react-bootstrap";
// @ts-ignore
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import React from "react";

function Home(){
    return(
        <div className='home-container h-100'>
            <Helmet><title>ReactTutorAI</title></Helmet>
            <VantaBackground />
            <div className="content h-100">
                <Header isMainPage={true}/>
                <div className="main h-100 justify-content-center align-items-center d-flex flex-column">
                    <img src={largeLogo} width='100px' alt="Logo"/>
                    <h1>React.TutorAI</h1>
                    <p>Личный помощник в изучении фронтенд-разработки.</p>
                    <div className="buttons d-md-flex col-12 col-md-6 justify-content-center">
                        <Link to='/Chat' className='w-100 m-md-3'><Button className={`w-100 ${styles.buttonStart}`}>Начать изучение</Button></Link>
                        <Link to='/notfound' className='w-100 m-md-3'><Button className={` w-100 mt-3 mt-md-0 ${styles.buttonStart}`}>О проекте</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
