import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import useElementWidth from "../../hooks/useElementWidth.js";
import useElementHeight from "../../hooks/useElementHeight.js";
import largeLogo from "../../assets/icons/largeLogo.png";
import userAvatar from "../../assets/icons/avatar.png";
import {Button, Form} from "react-bootstrap";
import send from "../../assets/icons/send.png";
import {ScreenSizeContext} from "../../contexts/ScreenSizeContext.jsx";
import TotalHeightText from "../TotalHeightText/TotalHeightText.js";
import styles from './ChatPanel.module.css'
function ChatPanel({onChangeChatPanel}) {
    const [chatRef,clientChatMaxHeight] = useElementHeight(null)
    const submitButton = useRef(null);
    const [chatInputElementRef,chatInputElementWidth] = useElementWidth();
    const [formValue, setFormValue] = useState(0);
    const [clientChatTotalHeight,setClientChatTotalHeight] = useState(null)
    const [formControlChatRef, formControlChatWidth] = useElementWidth(null)
    const wrapperButtonSubmitRef = useRef(null);
    const chatFormWrapperRef = useRef(null);
    const [mainContentRef, mainContentWidth] = useElementWidth(null)
    const {setMainContentSize, clientWindowSize,navbarHeight} = useContext(ScreenSizeContext);
    const [mainHeight,setMainHeight] = useState(0);

    useEffect(() => {
        setMainContentSize(mainHeight);
    },[mainHeight])
    const handleHeightChange = (newHeight)=>{
        setClientChatTotalHeight(newHeight);
    }
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
        onChangeChatPanel(mainContentRef)
        if(clientWindowSize[1] <= 767){
            mainContentRef.current.style.height = `${clientWindowSize[1] + 100}px`;
        }else{
            const mathMainHeight = ((clientWindowSize[1] - navbarHeight) * 0.99) - chatFormWrapperRef.current.getBoundingClientRect().height
            setMainHeight(mathMainHeight)
            mainContentRef.current.style.height = mathMainHeight + 'px';
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

    return (

        <main className={`col-12 col-md-9 ps-2 pe-0 mt-3 mt-md-0 d-flex flex-column ${styles.wrapperChat}`}
              ref={mainContentRef}>
            <TotalHeightText refComponent={mainContentRef} querySelector='.message'
                             onHeightChange={handleHeightChange}/>
            <div className={`${styles.chatHeader} text-md-start text-center`}>
                <h4>Чат с ReactTutor</h4>
                <div className={styles.date}><span>20.10.2024</span></div>
                <hr/>
            </div>
            <div className={`h-100 mh-100 pb-5 mb-2 ${styles.chat}`} ref={chatRef}>
                <div
                    className={`d-flex flex-column w-100 align-items-start message messageReactTutor`}>
                    <div className={`${styles.headerMessage} ${styles.headerMessageReactTutor}`}>
                        <img src={largeLogo} width='35px' alt="largeLogo"/>
                        <span className='ps-2'>ReactTutor</span>
                    </div>
                    <div className={`${styles.contentMessage} ${styles.contentMessageReactTutor} mt-3`}>
                        <p className='m-0'>Привет! Я ReactTutor, твой помощник в изучении фронтенда.</p>
                    </div>
                    <div className={`${styles.footerMessage} mt-1`}>
                        <span>20:27</span>
                    </div>
                </div>

                <div className={`d-flex flex-column w-100 align-items-end message messageUser`}>
                    <div className={`${styles.headerMessage} ${styles.headerMessageUser}`}>
                        <span className='pe-2'>Александр</span>
                        <img src={userAvatar} width='35px' alt="largeLogo"/>
                    </div>
                    <div className={`${styles.contentMessage} ${styles.contentMessageUser} mt-3`}>
                        <p className='m-0'>Пожалуй я выберу Js</p>
                    </div>
                    <div className={`${styles.footerMessage} mt-1`}>
                        <span>20:29</span>
                    </div>
                </div>
                <div
                    className={`d-flex flex-column w-100 align-items-start message messageReactTutor`}>
                    <div className={`${styles.headerMessage} ${styles.headerMessageReactTutor}`}>
                        <img src={largeLogo} width='35px' alt="largeLogo"/>
                        <span className='ps-2'>ReactTutor</span>
                    </div>
                    <div className={`${styles.contentMessage} ${styles.contentMessageReactTutor} mt-3`}>
                        <p className='m-0'>Привет! Я ReactTutor, твой помощник в изучении фронтенда.</p>
                    </div>
                    <div className={`${styles.footerMessage} mt-1`}>
                        <span>20:27</span>
                    </div>
                </div>

                <div className={`d-flex flex-column w-100 align-items-end message messageUser`}>
                    <div className={`${styles.headerMessage} ${styles.headerMessageUser}`}>
                        <span className='pe-2'>Александр</span>
                        <img src={userAvatar} width='35px' alt="largeLogo"/>
                    </div>
                    <div className={`${styles.contentMessage} ${styles.contentMessageUser} mt-3`}>
                        <p className='m-0'>Пожалуй я выберу Js</p>
                    </div>
                    <div className={`${styles.footerMessage} mt-1`}>
                        <span>20:29</span>
                    </div>
                </div>
                <div
                    className={`d-flex flex-column w-100 align-items-start message messageReactTutor`}>
                    <div className={`${styles.headerMessage} ${styles.headerMessageReactTutor}`}>
                        <img src={largeLogo} width='35px' alt="largeLogo"/>
                        <span className='ps-2'>ReactTutor</span>
                    </div>
                    <div className={`${styles.contentMessage} ${styles.contentMessageReactTutor} mt-3`}>
                        <p className='m-0'>Привет! Я ReactTutor, твой помощник в изучении фронтенда.</p>
                    </div>
                    <div className={`${styles.footerMessage} mt-1`}>
                        <span>20:27</span>
                    </div>
                </div>

                <div className={`d-flex flex-column w-100 align-items-end message messageUser`}>
                    <div className={`${styles.headerMessage} ${styles.headerMessageUser}`}>
                        <span className='pe-2'>Александр</span>
                        <img src={userAvatar} width='35px' alt="largeLogo"/>
                    </div>
                    <div className={`${styles.contentMessage} ${styles.contentMessageUser} mt-3`}>
                        <p className='m-0'>Пожалуй я выберу Js</p>
                    </div>
                    <div className={`${styles.footerMessage} mt-1`}>
                        <span>20:29</span>
                    </div>
                </div>
                <div
                    className={`d-flex flex-column w-100 align-items-start message messageReactTutor`}>
                    <div className={`${styles.headerMessage} ${styles.headerMessageReactTutor}`}>
                        <img src={largeLogo} width='35px' alt="largeLogo"/>
                        <span className='ps-2'>ReactTutor</span>
                    </div>
                    <div className={`${styles.contentMessage} ${styles.contentMessageReactTutor} mt-3`}>
                        <p className='m-0'>Привет! Я ReactTutor, твой помощник в изучении фронтенда.</p>
                    </div>
                    <div className={`${styles.footerMessage} mt-1`}>
                        <span>20:27</span>
                    </div>
                </div>

                <div className={`d-flex flex-column w-100 align-items-end message messageUser`}>
                    <div className={`${styles.headerMessage} ${styles.headerMessageUser}`}>
                        <span className='pe-2'>Александр</span>
                        <img src={userAvatar} width='35px' alt="largeLogo"/>
                    </div>
                    <div className={`${styles.contentMessage} ${styles.contentMessageUser} mt-3`}>
                        <p className='m-0'>Пожалуй я выберу Js</p>
                    </div>
                    <div className={`${styles.footerMessage} mt-1`}>
                        <span>20:29</span>
                    </div>
                </div>
            </div>

            <Form
                className={`mt-auto pe-3 container-fluid pb-md-5 pb-3 position-fixed bottom-0 ${styles.chatFormWrapper}`}
                ref={chatFormWrapperRef}>
                <Form.Group className={`row ${styles.chatInput}`} ref={chatInputElementRef} controlId="formChat">
                    <div className="col-10 col-md-11 ps-0">
                        <Form.Control
                            as='textarea'
                            className={styles.formControlChat}
                            ref={formControlChatRef}
                            rows={1}
                            onInput={handleInput}
                            onChange={handleChangeTextarea}
                            placeholder="Ваш вопрос"
                        />
                    </div>
                    <div
                        className="col-2 ps-md-4 me-0 ps-lg-2 ps-xxl-4 ps-0 m-0 col-md-1 d-flex"
                        ref={wrapperButtonSubmitRef}>
                        <Button className={`${styles.buttonSubmit} disabled`} ref={submitButton}>
                            <img src={send} alt='Отправить'/>
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </main>
    )

}

export default ChatPanel;