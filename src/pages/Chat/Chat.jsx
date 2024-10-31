import Header from "../../components/Header/Header.jsx";
import largeLogo from '../../assets/icons/largeLogo.png';
import './Chat.css';
// import styles from './Chat.module.css';
import history from '../../assets/icons/history.png';
import send from '../../assets/icons/send.png';
import {Button, Form, Row} from "react-bootstrap";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Helmet} from "react-helmet";
import userAvatar from '../../assets/icons/avatar.png';
import useElementHeight from "../../hooks/useElementHeight.js";
import useElementWidth from "../../hooks/useElementWidth.js";

function Chat() {
    // const chatInputElementRef = useRef(null);
    const submitButton = useRef(null);
    // const mainContentRef = useRef(null);
    const [chatInputElementRef,chatInputElementWidth] = useElementWidth();
    const [mainContentRef, mainContentWidth] = useElementWidth(null)
    const [clientWindowSize, setClientWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const [formValue, setFormValue] = useState(0);
    const [clientChatTotalHeight,setClientChatTotalHeight] = useState(null)
    const [navbarRef,navbarHeight] = useElementHeight(null);
    const [chatRef,clientChatMaxHeight] = useElementHeight(null)

    const [formControlChatRef, formControlChatWidth] = useElementWidth(null)
    const wrapperButtonSubmitRef = useRef(null);
    const chatFormWrapperRef = useRef(null);
    const sideBarRef = useRef(null)
    useEffect(() => {
        const resizeHandler = () => setClientWindowSize([window.innerWidth, window.innerHeight])
        window.addEventListener('resize', resizeHandler);
        const messages = chatRef.current.querySelectorAll('.message');
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

    // Хук автоматического скролла в блоке чата.
    useLayoutEffect(() => {
        if(clientChatTotalHeight > clientChatMaxHeight){
            chatRef.current.style.overflowY = `scroll`;
            chatRef.current.classList.add('pe-3');
        }else{
            chatRef.current.classList.remove('pe-3');
            chatRef.current.style.overflowY = `hidden`;
        }

    }, [clientChatMaxHeight,clientChatTotalHeight,formValue]);

    // Функция блокировки кнопки отправки.
    const handleChangeTextarea = (e) =>{
        if(e.target.value.length){
            submitButton.current.classList.remove('disabled');
        }else{
            submitButton.current.classList.add('disabled');
        }
    }
    // Хук изменения высоты блока чата с сообщениями.
    useLayoutEffect(() => {
        if(clientWindowSize[1] <= 767){
            console.log('Вызвано')
            mainContentRef.current.style.height = `${clientWindowSize[1] + 100}px`;
        }else{
            mainContentRef.current.style.height = `${((clientWindowSize[1] - navbarHeight) * 0.99) - chatFormWrapperRef.current.getBoundingClientRect().height}px`;
        }

    },[navbarHeight,clientWindowSize])

    // Хук изменения длины окна чата с сообщениями.
    useEffect(() => {
        const mainContentWidth = mainContentRef.current.getBoundingClientRect().width;
        chatFormWrapperRef.current.style.width = `${mainContentWidth}px`;
    }, [clientWindowSize, mainContentWidth]);


    // Функция измения длины поля ввода.
    useLayoutEffect(() => {
        if(formControlChatRef){
            formControlChatRef.current.style.width = `${mainContentRef.current.offsetWidth}px`;
        }
        console.log('Вызвано!',chatInputElementWidth)
    }, [clientWindowSize,mainContentWidth]);

    // Функция измения высоты поля ввода и включения скролла в поле ввода.
    const handleInput = (e) => {
        setFormValue(e.target.value);
        const computedStyles = window.getComputedStyle(formControlChatRef.current);
        const minHeight = parseFloat(computedStyles.minHeight);
        const height = parseFloat(computedStyles.height);
        formControlChatRef.current.style.height = `${formControlChatRef.current.scrollHeight}px`;
        if (height > minHeight) {
            wrapperButtonSubmitRef.current.style.alignItems = 'end';
            if(height > 192) {
                formControlChatRef.current.style.overflowY = `scroll`;
                formControlChatRef.current.style.height = `250px`;
            }
        } else {
            formControlChatRef.current.style.overflowY = `hidden`;
            wrapperButtonSubmitRef.current.style.alignItems = 'center';
        }
    };
    // Хук сброса высоты по умолчанию.
    useLayoutEffect(() => {
        if(!formValue.length){
            formControlChatRef.current.style.overflowY = `hidden`;
            wrapperButtonSubmitRef.current.style.alignItems = 'center';
            formControlChatRef.current.style.height = '3rem';
        }
    },[formValue,formControlChatRef,wrapperButtonSubmitRef])

    //Функция скрытия сайдбара
    const handleShowSidebar = (e) => {
        e.currentTarget.blur();
        setTimeout(() => {
            document.activeElement.blur();
        }, 0);
        if (sideBarRef.current.classList.contains('collapsed')) {
            sideBarRef.current.classList.remove('collapsed');
            document.querySelector('.sideBarTitle').style.display = 'block';
            document.querySelector('.history__theme').style.display = 'block';
            document.querySelector('.sidebarHeader').classList.replace('justify-content-end', 'justify-content-between');
            mainContentRef.current.classList.replace('col-md-11','col-md-9');
            setTimeout(() => {
                sideBarRef.current.classList.replace('col-md-1','col-md-3');
            },200)
        } else {
            document.querySelector('.sideBarTitle').style.display = 'none';
            document.querySelector('.history__theme').style.display = 'none';
            document.querySelector('.sidebarHeader').classList.replace('justify-content-between', 'justify-content-end');
            sideBarRef.current.classList.replace('col-md-3','col-md-1');
            setTimeout(() => {
                mainContentRef.current.classList.replace('col-md-9','col-md-11');
            },200)
            sideBarRef.current.classList.add('collapsed');
        }
    };


    return (
        <div className='h-100 p-3 p-md-0'>
            <Helmet><title>Чат</title></Helmet>
            <Header navbarHeight={navbarHeight} refNavbar={navbarRef}/>
            <Row className=''>
                <aside className='sidebar col-12 col-md-3' ref={sideBarRef}>
                    <div className="d-flex sidebarHeader justify-content-between align-items-start">
                        <h5 className='sideBarTitle'>История тем общения</h5>
                        <Button className='clear__button'>
                            <img src={history} alt='История' className='p-2' onClick={handleShowSidebar} />
                        </Button>
                    </div>
                    <ul className='history__theme'>
                        <li><a href="">Знакомство</a></li>
                        <li>Выбор направления</li>
                        <li>Что такое html</li>
                        <li>{navbarHeight}</li>
                        <li>clientHeight: {clientWindowSize[1]}</li>
                    </ul>
                </aside>
                <main className="col-12 col-md-9 ps-2 pe-0 d-flex flex-column wrapperChat" ref={mainContentRef}>
                    <div className="chat_header text-md-start text-center">
                        <h3>Чат с ReactTutor</h3>
                        <div className="date pt-1"><span>20.10.2024</span></div>
                        <hr />
                    </div>
                    <div className="chat h-100 mh-100 pb-5 mb-2" ref={chatRef}>
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
                    <Form className='mt-auto pe-3 container-fluid pb-md-5 pb-3 chatFormWrapper position-fixed bottom-0'
                          ref={chatFormWrapperRef}>
                        <Form.Group className="row chat_input" ref={chatInputElementRef} controlId="formChat">
                            <div className="col-10 col-md-11 ps-0">
                                <Form.Control as='textarea' className='form-control__chat' ref={formControlChatRef}
                                              rows={1}
                                              onInput={handleInput} onChange={handleChangeTextarea}
                                              placeholder="Ваш вопрос"/>
                            </div>
                            <div
                                className="col-2 ps-md-4 me-0 ps-lg-2 ps-xxl-4 ps-0 m-0 col-md-1 d-flex"
                                ref={wrapperButtonSubmitRef}>
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