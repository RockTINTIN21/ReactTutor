import Header from "../../components/Header/Header.jsx";
import VantaBackground from "../../components/VantaBackground/VantaBackground.jsx";
import largeLogo from '../../assets/icons/largeLogo.png';
import './Chat.css';
import styles from './Chat.module.css';
import history from '../../assets/icons/history.png';
import send from '../../assets/icons/send.png';
import send_lock from '../../assets/icons/send_lock.png';
import {Button, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {Helmet} from "react-helmet";
import userAvatar from '../../assets/icons/avatar.png';
import ChangeButtonColor from "../../components/ChangeButtonColor/ChangeButtonColor.jsx";

function Chat() {
    const chatInputElementRef = useRef(null);
    const submitButton = useRef(null);
    const mainContentRef = useRef(null);
    const [formControlChat,setFormControlChat] = useState(null);
    const [wrapperButtonSubmit, setWrapperButtonSubmit] = useState(null);
    const [navbarHeight,setNavbarHeight] = useState(null);
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    const [value, setValue] = useState(0);
    const [test,setTest] = useState(0)
    useEffect(() => {
        setNavbarHeight(document.querySelector('.navbar'));
        setFormControlChat(document.querySelector('.form-control__chat'));
        setWrapperButtonSubmit(document.querySelector('.wrapper-buttonSubmit'));
        const resizeHandler = () => setSize([window.innerWidth, window.innerHeight])
        window.addEventListener('resize', resizeHandler);
        return ()=>{
            window.removeEventListener('resize', () => setSize([window.innerWidth ,window.innerHeight]));
        }
    }, []);
    useEffect(() => {
        changeInputWidth();
    },[size,formControlChat]);

    const handleChangeTextarea = (e) =>{
        if(e.target.value.length){
            submitButton.current.classList.remove('disabled');
        }else{
            submitButton.current.classList.add('disabled');
        }
    }
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (navbarHeight) {
                console.log('test',navbarHeight.scrollHeight);
                const mainContentHeight = size[1] - parseFloat(getComputedStyle(navbarHeight).height);
                setTest(mainContentHeight);
                mainContentRef.current.style.height = `${mainContentHeight}px`;
            }
        }, 100); // Задержка в 100 мс
        return () => clearTimeout(timeoutId);
    }, [navbarHeight, size]);
    const changeInputWidth = () => {
        if(formControlChat){
            formControlChat.style.width = `${chatInputElementRef.current.offsetWidth}px`;
        }
    };
    const handleInput = (e) => {
        setValue(e.target.value);
        const computedStyles = window.getComputedStyle(formControlChat);
        const minHeight = parseFloat(computedStyles.minHeight);
        const height = parseFloat(computedStyles.height);
        formControlChat.style.height = `${formControlChat.scrollHeight}px`;
        if (height > minHeight) {
            wrapperButtonSubmit.style.alignItems = 'end';
            if(height >= 192) {
                formControlChat.style.overflowY = `scroll`;
            }
        } else {
            formControlChat.style.overflowY = `hidden`;
            wrapperButtonSubmit.style.alignItems = 'center';
        }
    };
    useEffect(() => {
        if(value.length === 0){
            formControlChat.style.overflowY = `hidden`;
            wrapperButtonSubmit.style.alignItems = 'center';
            formControlChat.style.height = '3rem';
        }
    },[value,formControlChat,wrapperButtonSubmit])
    return (
        <div className='h-100 p-3 p-md-0'>
            <Helmet><title>Чат</title></Helmet>
            <Header />
            <Row>
                <aside className='sidebar p-2 col-12 col-md-3 h-25'>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>История тем общения</h5>
                        <ChangeButtonColor path={history} alt={'История'} />
                    </div>
                    <ul className={styles.history__theme}>
                        <li><a href="">Знакомство</a></li>
                        <li>Выбор направления</li>
                        <li>Что такое html</li>
                        <li>{test}</li>
                    </ul>
                </aside>
                <main className="col-12 col-md-9 p-2" ref={mainContentRef}>
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

                    <Form className='mt-5 container-fluid'>
                        <Form.Group className="mb-3 row chat_input" ref={chatInputElementRef} controlId="formChat">
                            <div className="col-10 col-md-11 ps-0" >
                                <Form.Control as='textarea' className='form-control__chat' rows={1} onInput={handleInput} onChange={handleChangeTextarea} placeholder="Ваш вопрос" />
                            </div>
                            <div className="col-2 ps-md-4 ps-lg-2 ps-xxl-3 ps-0 m-0 col-md-1 d-flex wrapper-buttonSubmit">
                                {/*<ChangeButtonColor isSubmit={true} path={buttonSend} alt={'Отправить'} />*/}
                                <Button className='button_submit disabled' ref={submitButton}>
                                    <img src={send} alt='Отправить'/>
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                </main>
            </Row>
        </div>
    );
}

export default Chat;