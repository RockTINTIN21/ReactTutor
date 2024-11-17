import React, {Ref, RefObject, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import useElementWidth from "../../hooks/useElementWidth.ts";
import useElementHeight from "../../hooks/useElementHeight.ts";
import largeLogo from "../../assets/icons/largeLogo.png";
import userAvatar from "../../assets/icons/avatar.png";
import send from "../../assets/icons/send.png";
import {ScreenSizeContext} from "../../contexts/ScreenSizeContext.tsx";
import TotalHeightText from "../TotalHeightText/TotalHeightText.ts";
import styles from './ChatPanel.module.css'
import ChatForm from "../ChatForm/ChatForm.tsx";
import AnimationText from "../AnimationText/AnimationText.tsx";
import { v4 as uuidv4 } from 'uuid';
import {getAllDataUser} from "../../utils/FetchService.ts";
type ChatPanelType = {
    sidebarIsCollapsed:boolean;
}
function ChatPanel({sidebarIsCollapsed}: ChatPanelType) {
    type Message = {
        messageID: string;
        text: string;
        date: Date;
        isReactTutor: boolean;
        isAnimation: boolean;
    };

    type UserData = {
        userID: string;
        username: string;
        userAvatar: string;
        isNewChat: boolean;
        historyChat: Message[];
    };
    const [chatRef,clientChatMaxHeight] = useElementHeight()
    const [clientChatTotalHeight,setClientChatTotalHeight] = useState(0)
    const [mainContentRef, mainContentWidth] = useElementWidth()
    const [historyChatLength,setHistoryChatLength] = useState<number>(0);
    const { setMainContentSize, clientWindowSize, navbarHeight, isShowFirstMessage, mainContentSize } = useContext(ScreenSizeContext);
    const [mainHeight,setMainHeight] = useState<number>(0);
    const chatFormWrapperRef = useRef<HTMLDivElement | null>(null);
    const [userData,setUserData] = useState<UserData>(
        {
            userID: '',
            username:'',
            userAvatar:'',
            isNewChat:false,
            historyChat:[
                {
                    messageID: '',
                    text: '',
                    date: new Date,
                    isReactTutor: true,
                    isAnimation: true,
                }
            ]
        }
    )
    type layoutStateType = {
        isChatScroll:boolean,
        isFormScroll:boolean,
        isDisabledButton:boolean,
        isDesktop:boolean,
        isButtonDown:boolean
    }
    const [layoutState, setLayoutState] = useState<layoutStateType>({
        isChatScroll:false,
        isFormScroll:false,
        isDisabledButton:true,
        isDesktop:true,
        isButtonDown:false
    })

    useEffect(() => {
        const interval = setInterval(() => {
            const storedData = getAllDataUser()
            if (storedData !== userData) {
                setUserData(storedData);}
        }, 1000);
        return () => clearInterval(interval);
    }, [userData]);

    // const handleShowFirstMessage:() => void = () =>{
    //     setHistoryOfMessages((prevMessages) => [
    //         ...prevMessages,
    //         { text: 'Привет! Я ReactTutor, твой помощник в изучении фронтенда.', date: new Date(), isReactTutor: true, isAnimation:true}
    //     ])
    // }


    useEffect(() => {
        setHistoryChatLength(userData.historyChat.length);
    }, [userData]);

    useEffect(() => {
        setMainContentSize([mainHeight,0]);
    },[mainHeight])

    const handleSetRef = (ref: HTMLDivElement | null) => {
        chatFormWrapperRef.current = ref;
    };

    const handleHeightChange = (newHeight:number)=>{
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
        // console.log('clientChatTotalheight',clientChatTotalHeight, '>','clientChatMaxHeight',clientChatMaxHeight)
        // console.log('clientChatTotalheight',clientChatMaxHeight)
        setLayoutState((prevState)=>({
            ...prevState,
            isChatScroll:clientChatTotalHeight > clientChatMaxHeight,
        }));
    }, [clientChatMaxHeight,clientChatTotalHeight]);



    // Хук изменения высоты блока чата с сообщениями.
    useEffect(() => {
        if(mainContentRef.current && chatFormWrapperRef.current){
            if(clientWindowSize[0] <= 767){
                // mainContentRef.current!.style.height = `${clientWindowSize[1] + 100}px`;
            }else{
                const mathMainHeight = ((clientWindowSize[1] - navbarHeight) * 0.99) - chatFormWrapperRef.current.getBoundingClientRect().height
                if(mathMainHeight !== mainHeight){
                    setMainHeight(mathMainHeight)
                    // console.log('Вызван')
                    // mainContentRef.current!.style.height = mathMainHeight + 'px';
                }

            }
        }else{
            if(clientWindowSize[0] <= 767){
                mainContentRef.current!.style.height = `${clientWindowSize[1] + 100}px`;
            }else{
                const mathMainHeight = ((clientWindowSize[1] - navbarHeight) * 0.99) - 80
                if(mathMainHeight !== mainHeight){
                    setMainHeight(mathMainHeight)
                }

            }

        }
        // onChangeChatPanel(mainContentRef)


    },[navbarHeight,clientWindowSize])

    // Хук изменения длины окна чата с сообщениями.
    useEffect(() => {
        if(mainContentRef.current && chatFormWrapperRef.current){
            const mainContentWidth = mainContentRef.current!.getBoundingClientRect().width;
            chatFormWrapperRef.current.style.width = `${mainContentWidth}px`;
        }

    }, [clientWindowSize, mainContentWidth]);

    const memoizedMessages = useMemo(() => {
        return userData.historyChat.map(({ text, date, isReactTutor, isAnimation,messageID }, index) => {
            // @ts-ignore
            const messageContent:React.JSX.Element | string = isReactTutor && isAnimation ? <AnimationText text={text} id={messageID}/> : text;
            return (
                <div key={index}
                     className={`d-flex flex-column w-100 message ${isReactTutor ? `align-items-start ${styles.messageReactTutor}` : `align-items-end ${styles.messageUser}`}`}
                >
                    {isReactTutor ? (
                        <div className={`${styles.headerMessage} ${styles.headerMessageReactTutor} pe-md-0 pe-2`}>
                            <img src={largeLogo} width='35px' alt="avatar" />
                            <span className='ps-2'>ReactTutor</span>
                        </div>
                    ) : (
                        <div className={`${styles.headerMessage} ${styles.headerMessageUser} pe-md-0 pe-2`}>
                            <span className='pe-2'>{userData.username}</span>
                            <img src={userData.userAvatar} alt="avatar" />
                        </div>
                    )}
                    <div className={`${styles.contentMessage} ${isReactTutor ? styles.contentMessageReactTutor : styles.contentMessageUser} mt-2 ps-3`}>
                        <p className='m-0'>{messageContent}</p>
                    </div>
                    <div className={`${styles.footerMessage} ${isReactTutor ? `ps-2` : 'pe-2'} mt-1`}>
                    <span>
                        {new Date(date).toLocaleTimeString('en-CA', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}
                    </span>
                    </div>
                </div>
            );
        });
    }, [userData, styles]);
    return (
        <main style={{height:mainHeight}}
            className={`col-12 ps-0 pe-0 mt-3 mt-md-0 d-flex flex-column ${styles.wrapperChat}  ${(layoutState.isDesktop) ? sidebarIsCollapsed ? styles.wrapperChatCollapsed : styles.wrapperChatExpanded : 'col-12'}`}
              ref={mainContentRef}>
            <TotalHeightText refComponent={mainContentRef} querySelector='.message' currentLength={historyChatLength} onHeightChange={handleHeightChange}/>
            <div className={`${styles.chatHeader} text-md-start text-center pt-2`}>
                <h4>Чат с ReactTutor</h4>
                {/*<div className={styles.date}><span>20.10.2024</span></div>*/}
                {/*<hr/>*/}
            </div>
            <div className={`h-100 mh-100 pb-5 mb-md-0 mb-3 ${layoutState.isChatScroll && `${styles.chatScroll} pe-3`}`} ref={chatRef}>
                {memoizedMessages}
            </div>
            <ChatForm setRef={handleSetRef} historyChatLength={historyChatLength}
                      mainContentRef={mainContentRef} mainContentWidth={mainContentWidth}
                      layoutState={layoutState} setLayoutState={setLayoutState} userData={userData}
            />


        </main>
    )

}

export default ChatPanel;