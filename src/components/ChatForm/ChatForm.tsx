import userAvatar from "../../assets/icons/avatar.png";
import largeLogo from "../../assets/icons/largeLogo.png";
import React, {Dispatch, Ref, SetStateAction, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Button, Form, Row} from "react-bootstrap";
import styles from "./ChatForm.module.css";
import send from "../../assets/icons/send.png";
import {ScreenSizeContext} from "../../contexts/ScreenSizeContext.tsx";
import LaunchChat from "../LaunchChat/LaunchChat.tsx";

type LayoutStateType = {
    isChatScroll: boolean;
    isFormScroll: boolean;
    isDisabledButton: boolean;
    isDesktop: boolean;
    isButtonDown: boolean;
};

type ChatFormType = {
    layoutState: LayoutStateType;
    setLayoutState: Dispatch<SetStateAction<LayoutStateType>>;
    historyChatLength:number;
    mainContentWidth:number;
    setRef:(ref: HTMLDivElement | null) => void;
    mainContentRef: React.RefObject<HTMLDivElement>;
}
function ChatForm({layoutState,setLayoutState,historyChatLength,mainContentRef,mainContentWidth,setRef}:ChatFormType) {
    // const [isShowStartMessage,setIsShowStartMessage] = useState<boolean>(false);
    // const [isShowStartButtons,setIsShowStartButtons] = useState<boolean>(false)

    const submitButton = useRef<HTMLButtonElement>(null!);
    const chatInputElementRef = useRef<HTMLDivElement>(null!)
    const formControlChatRef = useRef<HTMLTextAreaElement>(null!)
    const wrapperButtonSubmitRef = useRef<HTMLDivElement>(null!);
    const [formValue, setFormValue] = useState<string>("");
    const chatFormWrapperRef = useRef<HTMLFormElement>(null!);
    const [isShowFirstMessage,setIsShowFirstMessage] = useState<boolean>(false)


    // const [mainContentRef,setMainContentRef] = useState<HTMLDivElement>(null!)
    const {clientWindowSize} = useContext(ScreenSizeContext);
    // const handleSetMainContentRef = (ref:HTMLDivElement | null) =>{
    //     setMainContentRef(setMainContentRef)
    // }
    // Функция изменения высоты поля ввода и включения скролла в поле ввода.
    useEffect(() => {
        if(setRef){
            setRef(chatInputElementRef.current);
        }
    }, [setRef]);
    const handleShowFirstMessage = () =>{
        setIsShowFirstMessage(true)
    }
    // setIsShowFirstMessage(true)
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setFormValue(e.currentTarget.value);
        const computedStyles = window.getComputedStyle(formControlChatRef.current);
        const minHeight = parseFloat(computedStyles.minHeight);
        const height = parseFloat(computedStyles.height);
        formControlChatRef.current.style.height = `${formControlChatRef.current.scrollHeight}px`;
        console.log('minHeight:',minHeight,'height:',height)
        setLayoutState((prevState:LayoutStateType)=>({
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
        if(formControlChatRef.current){
            if(!formValue.length){
                setLayoutState(prevState=>({
                    ...prevState,
                    isFormScroll:false
                }))
                formControlChatRef.current.style.height = '3rem';
            }
        }

    },[formValue,formControlChatRef,wrapperButtonSubmitRef])


    // Функция измения длины поля ввода.
    useLayoutEffect(() => {
        if(formControlChatRef.current && mainContentRef.current){
            formControlChatRef.current.style.width = `${mainContentRef.current!.offsetWidth}px`;
            formControlChatRef.current.style.width = clientWindowSize[0] >= 768 ? `${mainContentRef.current!.offsetWidth}px` : ` ${mainContentRef.current!.offsetWidth-10}px`;
        }
    }, [clientWindowSize,mainContentWidth]);

    // Функция блокировки кнопки отправки.
    const handleChangeTextarea = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setLayoutState((prevState)=>({
            ...prevState,
            isDisabledButton:e.target.value.length < 1,
        }));
    }
    return(
        <>
            {historyChatLength > 0 ? (
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
            ) : (
                // layoutStateButtons.isShowStartButton ? (
                //     <Button className={`w-100 ${styles.btnStart} ${styles.btnsStart}
                //     ${layoutStateButtons.isShowStartButtonStyle && styles.btnsStartShow}`} onClick={onStartChat}
                //             ref={startButtonRef} onTransitionEnd={handleTransitionEndStartButton}>Начать беседу</Button>
                // ):(
                //     <Row className="p-3 d-flex gap-3">
                //         <Button className={`col-12  mb-md-2 ${styles.btnStarter} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtons && styles.btnsStartShow}`}>Я только начинаю</Button>
                //         <Button className={`col btn ${styles.btnHtmlCss} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtons && styles.btnsStartShow}`}>HTML/CSS</Button>
                //         <Button className={`col btn ${styles.btnJs} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtons && styles.btnsStartShow}`}>JS/TypeScript</Button>
                //         <Button className={`col btn ${styles.btnReact} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtons && styles.btnsStartShow}`}>React</Button>
                //     </Row>
                //
                //
                // )
                <LaunchChat handleShowFirstMessage={}/>
            )
            }
        </>

    )
}
export default ChatForm;