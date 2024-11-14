import React, {useContext} from 'react';
import styles from './LaunchChat.module.css'
import {useEffect, useRef, useState} from "react";
import {Button, Row} from "react-bootstrap";
import {ScreenSizeContext} from "../../contexts/ScreenSizeContext.tsx";
type layoutStateButtonsType = {
    isShowStartButton:boolean;
    isShowStartButtonStyle:boolean;
    isShowLevelButtons:boolean;
    isShowLevelButtonStyles:boolean;
}
type LaunchChatType = {

}
function LaunchChat({}:LaunchChatType) {
    const startButtonRef = useRef<HTMLButtonElement>(null!)
    const [layoutStateButtons,setLayoutStateButtons] = useState<layoutStateButtonsType>({
        isShowStartButton:false,
        isShowLevelButtons:false,
        isShowStartButtonStyle:false,
        isShowLevelButtonStyles:false
    })
    // const [isShowFirstMessage,setIsShowFirstMessage] = useState<boolean>(false)

    const {setIsShowFirstMessage} = useContext(ScreenSizeContext)
    // useEffect(()=>{
    //     handleShowFirstMessage(true)
    // },[isShowFirstMessage])


    useEffect(() => {
        setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
            ...prevState,
            isShowStartButton:true,
            isShowStartButtonStyle:true
        }))
    }, []);


    const onStartChat = () =>{
        setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
            ...prevState,
            isShowStartButtonStyle:false,
            isShowLevelButtons:true
        }))
        console.log('isShowLevelButton:','true')
    }
    const handleTransitionEndStartButton = () =>{
        setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
            ...prevState,
            isShowStartButton:false,
            isShowLevelButton:true,

        }))
        setTimeout(()=>{
            setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
                ...prevState,
                isShowLevelButtonStyles:true
            }))
            setTimeout(()=>{
                setIsShowFirstMessage(true)
            },1000)
        },300)
        console.log('Анимация закончена')

    }
    return (
        layoutStateButtons.isShowStartButton ? (
            <Button className={`w-100 ${styles.btnStart} ${styles.btnsStart}
            ${layoutStateButtons.isShowStartButtonStyle && styles.btnsStartShow}`} onClick={onStartChat}
                    ref={startButtonRef} onTransitionEnd={handleTransitionEndStartButton}>Начать беседу</Button>
        ):(
            <Row className="p-3 d-flex gap-3">
                <Button className={`col-12  mb-md-2 ${styles.btnStarter} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtonStyles && styles.btnsStartShow}`}>Я только начинаю</Button>
                <Button className={`col btn ${styles.btnHtmlCss} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtonStyles && styles.btnsStartShow}`}>HTML/CSS</Button>
                <Button className={`col btn ${styles.btnJs} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtonStyles && styles.btnsStartShow}`}>JS/TypeScript</Button>
                <Button className={`col btn ${styles.btnReact} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtonStyles && styles.btnsStartShow}`}>React</Button>
            </Row>
        )
    )
}
export default LaunchChat