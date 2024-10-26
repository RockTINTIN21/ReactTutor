import Header from "../../components/Header/Header.jsx";
import VantaBackground from "../../components/VantaBackground/VantaBackground.jsx";
import largeLogo from '../../assets/icons/largeLogo.png';
import './Chat.css';
import styles from './Chat.module.css';
import history from '../../assets/icons/history.png';
import send from '../../assets/icons/send.png';
import {Button, Card, CardGroup, Carousel, Col, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {Helmet} from "react-helmet";
import userAvatar from '../../assets/icons/avatar.png';
import ChangeButtonColor from "../../components/ChangeButtonColor/ChangeButtonColor.jsx";

function Chat() {
    const textareaRef = useRef(null);
    const [chatInputElement, setChatInputElement] = useState(null);
    const [formControlChat, setFormControlChat] = useState(null);
    const [wrapperButtonSubmit, setWrapperButtonSubmit] = useState(null);
    const [size, setSize] = useState([window.innerWidth]);
    const testRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            setChatInputElement(document.querySelector('.chat_input'));
            setFormControlChat(document.querySelector('.form-control__chat'));
            setWrapperButtonSubmit(document.querySelector('.wrapper-buttonSubmit'));
        },0);

        // changeInputWidth();
        const resizeHandler = () => setSize([window.innerWidth])
        window.addEventListener('resize', resizeHandler);
        return ()=>{
            window.removeEventListener('resize', () => setSize([window.innerWidth]));
        }
    }, []);
    useEffect(() => {
        changeInputWidth();
        console.log('test')
    },[size])
    const changeInputWidth = () => {
        if (formControlChat && chatInputElement) {
            console.log('вызвано!');
            formControlChat.style.width = `${chatInputElement.offsetWidth}px`;
        }
    };

    // Обработка ввода в textarea
    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;

        const computedStyles = window.getComputedStyle(formControlChat);
        const minHeight = parseFloat(computedStyles.minHeight);
        const height = parseFloat(computedStyles.height);

        if (height > minHeight) {
            wrapperButtonSubmit.style.alignItems = 'end';
        } else {
            wrapperButtonSubmit.style.alignItems = 'center';
        }
    };

    return (
        <div className='h-100 p-md-0 p-3'>
            <Helmet><title>Чат</title></Helmet>
            <Header />
            <div className="mt-2 row">
                <aside className='sidebar p-2 col-12 col-md-3'>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>История тем общения</h5>
                        <ChangeButtonColor path={history} alt={'История'} />
                    </div>
                    <ul className={styles.history__theme}>
                        <li>Знакомство</li>
                        <li>Выбор направления</li>
                        <li>Что такое html</li>
                    </ul>
                </aside>
                <main className="col-12 col-md-9 p-2">
                    <div className="chat_header text-md-start text-center">
                        <h3>Чат с ReactTutor</h3>
                        <div className="date pt-1"><span>20.10.2024</span></div>
                        <hr />
                    </div>
                    <div className="chat pt-3">
                        <div className="message__reactTutor d-flex flex-column w-100 align-items-start">
                            <div className='header_message header_message__reactTutor'>
                                <img src={largeLogo} width='35px' alt="largeLogo" />
                                <span className='ps-2'>ReactTutor</span>
                            </div>
                            <div className='content_message content_message__reactTutor mt-3'>
                                <p className='m-0'>Привет! Я ReactTutor, твой помощник в изучении фронтенда.</p>
                            </div>
                            <div className='footer_message mt-1'>
                                <span>20:27</span>
                            </div>
                        </div>

                        <div className="message__user d-flex flex-column w-100 align-items-end">
                            <div className='header_message header_message__user'>
                                <span className='pe-2'>Александр</span>
                                <img src={userAvatar} width='35px' alt="largeLogo" />
                            </div>
                            <div className='content_message content_message__user mt-3'>
                                <p className='m-0'>Пожалуй я выберу Js</p>
                            </div>
                            <div className='footer_message mt-1'>
                                <span>20:29</span>
                            </div>
                        </div>
                    </div>

                    <Form className='mt-5 container-fluid '>
                        <Form.Group className="mb-3 row chat_input" controlId="formChat">
                            <div className="col-10 col-md-11 ps-0" ref={testRef}>
                                <Form.Control as='textarea' className='form-control__chat' rows={1} onInput={handleInput} ref={textareaRef} placeholder="Ваш вопрос" />
                            </div>
                            <div className="col-2 ps-md-4 ps-0 m-0 col-md-1 d-flex wrapper-buttonSubmit">
                                <ChangeButtonColor isSubmit={true} path={send} alt={'Отправить'} />
                            </div>
                        </Form.Group>
                    </Form>
                </main>
            </div>
        </div>
    );
}

export default Chat;