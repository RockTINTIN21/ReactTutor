import Header from "../../components/Header/Header.jsx";
import VantaBackground from "../../components/VantaBackground/VantaBackground.jsx";
import largeLogo from '../../assets/icons/largeLogo.png';
import './Chat.css';
import styles from './Chat.module.css';
import history from '../../assets/icons/history.png';
import send from '../../assets/icons/send.png';
import send_lock from '../../assets/icons/send_lock.png';
import {Button, Form, Row} from "react-bootstrap";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Helmet} from "react-helmet";
import userAvatar from '../../assets/icons/avatar.png';
import ChangeButtonColor from "../../components/ChangeButtonColor/ChangeButtonColor.jsx";
import useElementHeight from "../../hooks/useElementHeight.js";
import useElementWidth from "../../hooks/useElementWidth.js";

function Chat() {
    const chatInputElementRef = useRef(null);
    const submitButton = useRef(null);
    const mainContentRef = useRef(null);
    const [clientWindowSize, setClientWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const [formValue, setFormValue] = useState(0);
    const [clientChatTotalHeight,setClientChatTotalHeight] = useState(null)
    const [navbarRef,navbarHeight] = useElementHeight(null);
    const [chatMaxHeightRef,clientChatMaxHeight] = useElementHeight(null)
    const [formControlChatRef, formControlChatWidth] = useElementWidth(null)
    const wrapperButtonSubmitRef = useRef(null);
    const chatFormWrapperRef = useRef(null);
    // const [chatFormWrapperRef, chatFormWrapperWidth] = useElementWidth(null);
    // const [mainContentRef, mainContentWidth] = useElementWidth(null);
    useEffect(() => {
        const resizeHandler = () => setClientWindowSize([window.innerWidth, window.innerHeight])
        window.addEventListener('resize', resizeHandler);
        const messages = chatMaxHeightRef.current.querySelectorAll('.message');
        const resizeObserver = new ResizeObserver((entries) => {
            let totalHeight = 0;
            for (let entry of entries) {
                totalHeight += entry.contentRect.height;
                console.log('totalHeight:',totalHeight)
            }
            setClientChatTotalHeight(totalHeight);
        });

        messages.forEach((message)=>resizeObserver.observe(message));
        return () => {
            window.removeEventListener('resize', () => setClientWindowSize([window.innerWidth ,window.innerHeight]));
            messages.forEach((message)=>resizeObserver.unobserve(message));
            resizeObserver.disconnect();
        }
    },[])

    useEffect(() => {
        changeInputWidth();
    },[clientWindowSize]);

    useLayoutEffect(() => {
        console.log('CurrentHeight:',clientChatTotalHeight,'maxHeight:',clientChatMaxHeight)
        if(clientChatTotalHeight > clientChatMaxHeight){

        }

    }, [clientChatMaxHeight,clientChatTotalHeight]);
    const handleChangeTextarea = (e) =>{
        if(e.target.value.length){
            submitButton.current.classList.remove('disabled');
        }else{
            submitButton.current.classList.add('disabled');
        }
    }
    useLayoutEffect(() => {
        mainContentRef.current.style.height = `${((clientWindowSize[1] - navbarHeight) * 0.99) - chatFormWrapperRef.current.getBoundingClientRect().height}px`;
    },[navbarHeight])

    useEffect(() => {
        const mainContentWidth = mainContentRef.current.getBoundingClientRect().width;
        chatFormWrapperRef.current.style.width = `${mainContentWidth}px`;
    }, [clientWindowSize]);


    const changeInputWidth = () => {
        if(formControlChatRef){
            formControlChatRef.current.style.width = `${chatInputElementRef.current.offsetWidth}px`;
        }
    };
    const handleInput = (e) => {
        setFormValue(e.target.value);
        const computedStyles = window.getComputedStyle(formControlChatRef.current);
        const minHeight = parseFloat(computedStyles.minHeight);
        const height = parseFloat(computedStyles.height);
        formControlChatRef.current.style.height = `${formControlChatRef.current.scrollHeight}px`;
        if (height > minHeight) {
            wrapperButtonSubmitRef.current.style.alignItems = 'end';
            if(height >= 192) {
                formControlChatRef.current.style.overflowY = `scroll`;
            }
        } else {
            formControlChatRef.current.style.overflowY = `hidden`;
            wrapperButtonSubmitRef.current.style.alignItems = 'center';
        }
    };
    useLayoutEffect(() => {
        if(!formValue.length){
            formControlChatRef.current.style.overflowY = `hidden`;
            wrapperButtonSubmitRef.current.style.alignItems = 'center';
            formControlChatRef.current.style.height = '3rem';
        }
    },[formValue,formControlChatRef,wrapperButtonSubmitRef])

    return (
        <div className='h-100 p-3 p-md-0'>
            <Helmet><title>Чат</title></Helmet>
            <Header navbarHeight={navbarHeight} refNavbar={navbarRef}/>
            <Row className=''>
                <aside className='sidebar p-2 col-12 col-md-3 h-25'>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>История тем общения</h5>
                        <ChangeButtonColor path={history} alt={'История'} />
                    </div>
                    <ul className={styles.history__theme}>
                        <li><a href="">Знакомство</a></li>
                        <li>Выбор направления</li>
                        <li>Что такое html</li>
                        <li>{navbarHeight}</li>
                        <li>clientHeight: {clientWindowSize[1]}</li>
                    </ul>
                </aside>
                <main className="col-12 col-md-9 p-2 d-flex flex-column wrapperChat" ref={mainContentRef}>
                    <div className="chat_header text-md-start text-center">
                        <h3>Чат с ReactTutor</h3>
                        <div className="date pt-1"><span>20.10.2024</span></div>
                        <hr />
                    </div>
                    <div className="chat h-100 mh-100" ref={chatMaxHeightRef}>
                        <div className="message message__reactTutor d-flex flex-column w-100 align-items-start">
                            <div className='header_message header_message__reactTutor'>
                                <img src={largeLogo} width='35px' alt="largeLogo"/>
                                <span className='ps-2'>ReactTutor</span>
                            </div>
                            <div className='content_message content_message__reactTutor mt-3'>
                                <p className='m-0'>Привет! Я ReactTutor, твой помощник в изучении фронтенда.</p>
                            </div>
                            <div className='footer_message mt-1'>
                                <span>20:27</span>
                            </div>
                        </div>

                        <div className="message message__user d-flex flex-column w-100 align-items-end">
                            <div className='header_message header_message__user'>
                                <span className='pe-2'>Александр</span>
                                <img src={userAvatar} width='35px' alt="largeLogo"/>
                            </div>
                            <div className='content_message content_message__user mt-3'>
                                <p className='m-0'>Пожалуй я выберу Js</p>
                            </div>
                            <div className='footer_message mt-1'>
                                <span>20:29</span>
                            </div>
                        </div>
                        <div className="message message__reactTutor d-flex flex-column w-100 align-items-start">
                            <div className='header_message header_message__reactTutor'>
                                <img src={largeLogo} width='35px' alt="largeLogo"/>
                                <span className='ps-2'>ReactTutor</span>
                            </div>
                            <div className='content_message content_message__reactTutor mt-3'>
                                <p className='m-0'>Привет! Я ReactTutor, твой помощник в изучении фронтенда.</p>
                            </div>
                            <div className='footer_message mt-1'>
                                <span>20:27</span>
                            </div>
                        </div>
                        <div className="message message__user d-flex flex-column w-100 align-items-end">
                            <div className='header_message header_message__user'>
                                <span className='pe-2'>Александр</span>
                                <img src={userAvatar} width='35px' alt="largeLogo"/>
                            </div>
                            <div className='content_message content_message__user mt-3'>
                                <p className='m-0'>Пожалуй я выберу Js</p>
                            </div>
                            <div className='footer_message mt-1'>
                                <span>20:29</span>
                            </div>
                        </div>
                        <div className="message message__reactTutor d-flex flex-column w-100 align-items-start">
                            <div className='header_message header_message__reactTutor'>
                                <img src={largeLogo} width='35px' alt="largeLogo"/>
                                <span className='ps-2'>ReactTutor</span>
                            </div>
                            <div className='content_message content_message__reactTutor mt-3'>
                                <p className='m-0'>Привет! Я ReactTutor, твой помощник в изучении фронтенда.</p>
                            </div>
                            <div className='footer_message mt-1'>
                                <span>20:27</span>
                            </div>
                        </div>

                    </div>
                    <Form className='mt-auto p-2 container-fluid pb-md-5 chatFormWrapper position-fixed bottom-0' ref={chatFormWrapperRef}>
                        <Form.Group className="row chat_input" ref={chatInputElementRef} controlId="formChat">
                            <div className="col-10 col-md-11 ps-0">
                                <Form.Control as='textarea' className='form-control__chat' ref={formControlChatRef} rows={1}
                                              onInput={handleInput} onChange={handleChangeTextarea}
                                              placeholder="Ваш вопрос"/>
                            </div>
                            <div
                                className="col-2 ps-md-4 ps-lg-2 ps-xxl-3 ps-0 m-0 col-md-1 d-flex" ref={wrapperButtonSubmitRef}>
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