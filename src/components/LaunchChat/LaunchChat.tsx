import React from 'react';
import styles from './LaunchChat.module.css'
import {useEffect, useRef, useState} from "react";
import {Button, Row} from "react-bootstrap";
type layoutStateButtonsType = {
    isShowStartButton:boolean,
    isShowStartButtonStyle:boolean,
    isShowLevelButtons:boolean
}
type LaunchChatType = {
    handleShowFirstMessage:(showFirstMessage: boolean) => void,
}
function LaunchChat({handleShowFirstMessage}:LaunchChatType) {
    const startButtonRef = useRef<HTMLButtonElement>(null!)
    const [layoutStateButtons,setLayoutStateButtons] = useState<layoutStateButtonsType>({
        isShowStartButton:false,
        isShowLevelButtons:false,
        isShowStartButtonStyle:false
    })
    const [isShowFirstMessage,setIsShowFirstMessage] = useState<boolean>(false)
    // useEffect(()=>{
    //     handleShowFirstMessage(true)
    // },[isShowFirstMessage])
    handleShowFirstMessage(true)

    useEffect(() => {
        if(!historyChatLength){
            setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
                ...prevState,
                isShowStartButton:true,
                isShowStartButtonStyle:true
            }))
        }
    }, []);


    const onStartChat = () =>{
        setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
            ...prevState,
            isShowStartButtonStyle:false,
            // isShowLevelButtons:true
        }))
        // setTimeout(()=>{
        //     setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
        //         ...prevState,
        //         isShowStartButton:false
        //     }))
        // },3000)
        console.log('isShowLevelButton:','true')
        // setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
        //     ...prevState,
        //     isShowStartButton:true
        //
        // }))
        // setTimeout(()=>{
        //     setIsShowStartButtons(true)
        //     setTimeout(()=>{
        //         setIsShowStartMessage(true);
        //     },3000)
        // },3000)

    }
    const handleTransitionEndStartButton = () =>{
        setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
            ...prevState,
            isShowStartButton:false
        }))
        console.log('Анимация закончена')
    }
    return (
        layoutStateButtons.isShowStartButton ? (
            <Button className={`w-100 ${styles.btnStart} ${styles.btnsStart}
            ${layoutStateButtons.isShowStartButtonStyle && styles.btnsStartShow}`} onClick={onStartChat}
                    ref={startButtonRef} onTransitionEnd={handleTransitionEndStartButton}>Начать беседу</Button>
        ):(
            <Row className="p-3 d-flex gap-3">
                <Button className={`col-12  mb-md-2 ${styles.btnStarter} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtons && styles.btnsStartShow}`}>Я только начинаю</Button>
                <Button className={`col btn ${styles.btnHtmlCss} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtons && styles.btnsStartShow}`}>HTML/CSS</Button>
                <Button className={`col btn ${styles.btnJs} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtons && styles.btnsStartShow}`}>JS/TypeScript</Button>
                <Button className={`col btn ${styles.btnReact} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtons && styles.btnsStartShow}`}>React</Button>
            </Row>
        )
    )
}
export default LaunchChat