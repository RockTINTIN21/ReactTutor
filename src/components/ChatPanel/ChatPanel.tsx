import React, {Ref, RefObject, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
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
type ChatPanelType = {
    sidebarIsCollapsed:boolean;
}
const info = {
    userName:'Александр',
    userAvatar:userAvatar,
    reactTutorAvatar:largeLogo
}
type historyOfMessagesType = {
    text:string;
    date: Date;
    isReactTutor: boolean;
    isAnimation:boolean;
}[]
// const historyOfMessages:historyOfMessagesType = [
//     {
//         text: 'Привет! Я ReactTutor, твой помощник в изучении фронтенда.',
//         date: new Date(),
//         isReactTutor:true,
//     },
//     {
//         text: 'Привет!',
//         date: new Date(),
//         isReactTutor:false,
//     },
//     {
//         text: 'Теперь вы можете добавлять новые объекты в historyOfMessages, и TypeScript будет проверять тип каждого объекта в массиве.',
//         date: new Date(),
//         isReactTutor:true,
//     },
//     {
//         text: ' message.date.toLocaleDateString(\'en-CA\', {\n' +
//             '                                    hour: \'2-digit\',\n' +
//             '                                    minute: \'2-digit\',\n' +
//             '                                    hour12: false\n' +
//             '                                }).replace(\'-\', \':\')\n' +
//             'как выводить только часы и минуты',
//         date: new Date(),
//         isReactTutor:false,
//     },
// ]
function ChatPanel({sidebarIsCollapsed}: ChatPanelType) {
    const [historyOfMessages,setHistoryOfMessages] = useState<historyOfMessagesType>([
        {
            text: 'Привет! Я ReactTutor, твой помощник в изучении фронтенда.',
            date: new Date(),
            isReactTutor:true,
            isAnimation:false
        },
        {
            text: 'Привет!',
            date: new Date(),
            isReactTutor:false,
            isAnimation:false
        },
        {
            text: 'Теперь вы можете добавлять новые объекты в historyOfMessages, и TypeScript будет проверять тип каждого объекта в массиве.',
            date: new Date(),
            isReactTutor:true,
            isAnimation:false
        },
        {
            text: ' message.date.toLocaleDateString(\'en-CA\', {\n' +
                '                                    hour: \'2-digit\',\n' +
                '                                    minute: \'2-digit\',\n' +
                '                                    hour12: false\n' +
                '                                }).replace(\'-\', \':\')\n' +
                'как выводить только часы и минуты',
            date: new Date(),
            isReactTutor:false,
            isAnimation:false
        },
    ])
    useEffect(() => {
        setTimeout(() => {
            console.log('Добавлено новое сообщение!')
            setHistoryOfMessages(prevMessages => [
                ...prevMessages,
                { text: 'new', date: new Date(), isReactTutor: true, isAnimation:true }
            ])
        }, 3000)
    }, []);


    const [chatRef,clientChatMaxHeight] = useElementHeight()
    const [clientChatTotalHeight,setClientChatTotalHeight] = useState(0)
    const [mainContentRef, mainContentWidth] = useElementWidth()
    const [historyChatLength,setHistoryChatLength] = useState<number>(0);
    const { setMainContentSize, clientWindowSize, navbarHeight,isShowFirstMessage, mainContentSize } = useContext(ScreenSizeContext);
    const [mainHeight,setMainHeight] = useState<number>(0);
    const chatFormWrapperRef = useRef<HTMLDivElement | null>(null);
    // const [isShowStartMessage, setIsShowStartMessage] = useState<boolean>(false);
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
        setHistoryChatLength(historyOfMessages.length);
        console.log('Список обновился!')
    }, [historyOfMessages]);

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

    return (

        <main style={{height:mainHeight}}
            className={`col-12 ps-0 pe-0 mt-3 mt-md-0 d-flex flex-column ${styles.wrapperChat}  ${(layoutState.isDesktop) ? sidebarIsCollapsed ? styles.wrapperChatCollapsed : styles.wrapperChatExpanded : 'col-12'}`}
              ref={mainContentRef}>
            <TotalHeightText refComponent={mainContentRef} querySelector='.message' onHeightChange={handleHeightChange}/>
            <div className={`${styles.chatHeader} text-md-start text-center pt-2`}>
                <h4>Чат с ReactTutor</h4>
                {/*<div className={styles.date}><span>20.10.2024</span></div>*/}
                {/*<hr/>*/}
            </div>
            <div className={`h-100 mh-100 pb-5 mb-md-0 mb-3  
            ${layoutState.isChatScroll && `${styles.chatScroll} pe-3`}
            `} ref={chatRef}>
                {historyChatLength > 0 ? (
                    historyOfMessages.map(({ text, date, isReactTutor,isAnimation }, index) => (
                        <div key={index}
                             className={`d-flex flex-column w-100 message ${isReactTutor ? `align-items-start ${styles.messageReactTutor}` : `align-items-end ${styles.messageUser}`}`}
                        >
                            {isReactTutor ? (
                                <div className={`${styles.headerMessage} ${styles.headerMessageReactTutor} pe-md-0 pe-2`}>
                                    <img src={info.reactTutorAvatar} width='35px' alt="avatar" />
                                    <span className='ps-2'>ReactTutor</span>
                                </div>
                            ): (
                                <div
                                    className={`${styles.headerMessage} ${styles.headerMessageUser} pe-md-0 pe-2`}>
                                    <span className='pe-2'>{info.userName}</span>
                                    <img src={info.userAvatar} alt="avatar"/>
                                </div>
                            )}
                            <div
                                className={`${styles.contentMessage} ${isReactTutor ? styles.contentMessageReactTutor : styles.contentMessageUser} mt-2 ps-3`}>
                                <p className='m-0'>
                                    {isReactTutor && isAnimation ? (
                                        console.log('Вызвано')
                                        // <AnimationText text={text}/>
                                    ) : (
                                        text
                                    )}

                                </p>
                            </div>
                            <div className={`${styles.footerMessage} ${isReactTutor ? `ps-2` : 'pe-2'} mt-1`}>
                                <span>
                                    {date.toLocaleTimeString('en-CA', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    isShowFirstMessage ? (
                        <div className="d-flex flex-column w-100 align-items-start message messageReactTutor">
                            <div className={`${styles.headerMessage} ${styles.headerMessageReactTutor}`}>
                                <img src={largeLogo} width="35px" alt="largeLogo" />
                                <span className="ps-2">ReactTutor</span>
                            </div>
                            <div className={`${styles.contentMessage} ${styles.contentMessageReactTutor} mt-3`}>
                                <p className="m-0">Привет! Я ReactTutor, твой помощник в изучении фронтенда.</p>
                            </div>
                            <div className={`${styles.footerMessage} mt-1`}>
                                <span>20:27</span>
                            </div>
                        </div>
                    ) : (
                        <div className='text-center align-items-center'>Добро пожаловать! Что бы начать беседу нажмите кнопку ниже</div>
                    )
                )}


                {/*<div className={`d-flex flex-column w-100 align-items-end message messageUser`}>*/}
                {/*    <div className={`${styles.headerMessage} ${styles.headerMessageUser}`}>*/}
                {/*        <span className='pe-2'>Александр</span>*/}
                {/*        <img src={userAvatar} width='35px' alt="largeLogo"/>*/}
                {/*    </div>*/}
                {/*    <div className={`${styles.contentMessage} ${styles.contentMessageUser} mt-3`}>*/}
                {/*        <p className='m-0'>Пожалуй я выберу Js</p>*/}
                {/*    </div>*/}
                {/*    <div className={`${styles.footerMessage} mt-1`}>*/}
                {/*        <span>20:29</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <ChatForm setRef={handleSetRef} historyChatLength={historyChatLength} mainContentRef={mainContentRef} mainContentWidth={mainContentWidth} layoutState={layoutState} setLayoutState={setLayoutState} />


        </main>
    )

}

export default ChatPanel;