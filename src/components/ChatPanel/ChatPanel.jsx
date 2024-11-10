import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import useElementWidth from "../../hooks/useElementWidth.ts";
import useElementHeight from "../../hooks/useElementHeight.ts";
import largeLogo from "../../assets/icons/largeLogo.png";
import userAvatar from "../../assets/icons/avatar.png";
import {Button, Form} from "react-bootstrap";
import send from "../../assets/icons/send.png";
import {ScreenSizeContext} from "../../contexts/ScreenSizeContext.tsx";
import TotalHeightText from "../TotalHeightText/TotalHeightText.ts";
import styles from './ChatPanel.module.css'
import classNames from 'classnames'
function ChatPanel({onChangeChatPanel, sidebarIsCollapsed}) {
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
    const [layoutState, setLayoutState] = useState({isChatScroll:false,isFormScroll:false,isDisabledButton:true,isDesktop:true,isButtonDown:false})

    useEffect(() => {
        setMainContentSize(mainHeight);
    },[mainHeight])
    const handleHeightChange = (newHeight)=>{
        setClientChatTotalHeight(newHeight);
    }
    useEffect(() => {
        if(clientWindowSize[0] >= 768){
            setLayoutState(prevState => ({
                ...prevState,
                isDesktop: true
            }))
        }else{
            setLayoutState(prevState => ({
                ...prevState,
                isDesktop: false
            }))
        }
    },[clientWindowSize])
    // Хук автоматического скролла в блоке чата.
    useEffect(() => {
        setLayoutState((prevState)=>({
            ...prevState,
            isChatScroll:clientChatTotalHeight > clientChatMaxHeight,
        }));
    }, [clientChatMaxHeight,clientChatTotalHeight,formValue]);

    // Функция блокировки кнопки отправки.
    const handleChangeTextarea = (e) =>{
        setLayoutState((prevState)=>({
            ...prevState,
            isDisabledButton:e.target.value.length < 1,
        }));
    }

    // Хук изменения высоты блока чата с сообщениями.
    useLayoutEffect(() => {
        onChangeChatPanel(mainContentRef)
        if(clientWindowSize[0] <= 767){
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
            formControlChatRef.current.style.width = clientWindowSize[0] >= 768 ? `${mainContentRef.current.offsetWidth}px` : ` ${mainContentRef.current.offsetWidth-10}px`;
        }
    }, [clientWindowSize,mainContentWidth]);

    // Функция измения высоты поля ввода и включения скролла в поле ввода.
    const handleInput = (e) => {
        setFormValue(e.target.value);
        const computedStyles = window.getComputedStyle(formControlChatRef.current);
        const minHeight = parseFloat(computedStyles.minHeight);
        const height = parseFloat(computedStyles.height);
        formControlChatRef.current.style.height = `${formControlChatRef.current.scrollHeight}px`;
        console.log('minHeight:',minHeight,'height:',height)
        setLayoutState(prevState=>({
            ...prevState,
            isFormScroll:height > 192,
            isButtonDown:height> minHeight
        }))
    };
    useEffect(()=>{
        console.log(layoutState.isFormScroll);

    },[layoutState.isFormScroll]);
    // Хук сброса высоты по умолчанию.
    useLayoutEffect(() => {
        if(!formValue.length){
            setLayoutState(prevState=>({
                ...prevState,
                isFormScroll:false
            }))
            formControlChatRef.current.style.height = '3rem';
        }
    },[formValue,formControlChatRef,wrapperButtonSubmitRef])

    return (

        <main className={`col-12 ps-0 pe-0 mt-3 mt-md-0 d-flex flex-column ${styles.wrapperChat}  ${(layoutState.isDesktop) ? sidebarIsCollapsed ? styles.wrapperChatCollapsed : styles.wrapperChatExpanded : 'col-12'}`}
              ref={mainContentRef}>
            <TotalHeightText refComponent={mainContentRef} querySelector='.message'
                             onHeightChange={handleHeightChange}/>
            <div className={`${styles.chatHeader} text-md-start text-center`}>
                <h4>Чат с ReactTutor</h4>
                <div className={styles.date}><span>20.10.2024</span></div>
                <hr/>
            </div>
            <div className={`h-100 mh-100 pb-5 mb-md-0 mb-3  
            ${layoutState.isChatScroll && `${styles.chatScroll} pe-3`}
            `} ref={chatRef}>
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
                className={`mt-auto container-fluid pb-md-5 pb-3 position-fixed bottom-0 ${styles.chatFormWrapper}`}
                ref={chatFormWrapperRef}>
                <Form.Group className={`row`} ref={chatInputElementRef} controlId="formChat">
                    <div className="col-9 col-md-11 ps-0 pe-3">
                        <Form.Control
                            as='textarea'
                            className={`${styles.formControlChat} ${layoutState.isFormScroll && `overflow-y-scroll ${styles.formScroll}`} pe-5`}
                            ref={formControlChatRef}
                            rows={1}
                            onInput={handleInput}
                            onChange={handleChangeTextarea}
                            placeholder="Ваш вопрос"
                        />
                    </div>
                    <div
                        className={`col-2 ps-md-4 me-0 ps-lg-2 ps-xxl-4 ms-3 ms-md-auto ps-0 col-md-1 d-flex ${layoutState.isButtonDown && 'align-items-end pb-3'}`}
                        ref={wrapperButtonSubmitRef}>
                        <Button className={`${styles.buttonSubmit} ${layoutState.isDisabledButton && 'disabled'}`} ref={submitButton}>
                            <img src={send} alt='Отправить'  style={{width:'1.5rem'}}/>
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </main>
    )

}

export default ChatPanel;