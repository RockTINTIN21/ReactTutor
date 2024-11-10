import {Button} from "react-bootstrap";
import history from "../../assets/icons/history.png";
import {useContext, useEffect, useInsertionEffect, useRef, useState} from "react";
import TotalHeightText from "../TotalHeightText/TotalHeightText.ts";
import styles from "./Sidebar.module.css";
import { v4 as uuidv4 } from 'uuid';
import {ScreenSizeContext} from "../../contexts/ScreenSizeContext.tsx";
// eslint-disable-next-line react/prop-types
const themeMessages = [
    {
        title: 'Введение в программирование',
        themeId: uuidv4(),
        date: new Date('2023-01-15T10:30:00'),
    },
    {
        title: 'Как выбрать направление в IT',
        themeId: uuidv4(),
        date: new Date('2023-02-05T14:15:00'),
    },
    {
        title: 'Основы JavaScript: переменные, циклы, функции',
        themeId: uuidv4(),
        date: new Date('2023-03-12T09:45:00'),
    },
    {
        title: 'Создание первого проекта на HTML и CSS',
        themeId: uuidv4(),
        date: new Date('2023-04-02T16:00:00'),
    },
    {
        title: 'Асинхронный код в JavaScript',
        themeId: uuidv4(),
        date: new Date('2023-05-20T11:20:00'),
    },
    {
        title: 'Работа с DOM в JavaScript',
        themeId: uuidv4(),
        date: new Date('2023-06-10T15:30:00'),
    },
    {
        title: 'Знакомство с фреймворком React',
        themeId: uuidv4(),
        date: new Date('2023-07-15T13:10:00'),
    },
    {
        title: 'Использование Git и GitHub для работы над проектами',
        themeId: uuidv4(),
        date: new Date('2023-08-01T10:50:00'),
    },
    {
        title: 'Создание одностраничного приложения на React',
        themeId: uuidv4(),
        date: new Date('2023-08-20T14:40:00'),
    },
    {
        title: 'Основы тестирования и отладки кода',
        themeId: uuidv4(),
        date: new Date('2023-09-05T09:25:00'),
    },
    {
        title: 'Анимации и работа с Canvas в JavaScript',
        themeId: uuidv4(),
        date: new Date('2023-09-22T18:05:00'),
    },
    {
        title: 'Управление состоянием в React с помощью Redux',
        themeId: uuidv4(),
        date: new Date('2023-10-10T12:35:00'),
    },
    {
        title: 'Подключение к API и работа с запросами',
        themeId: uuidv4(),
        date: new Date('2023-10-25T17:10:00'),
    },
    {
        title: 'Создание и стилизация многостраничных сайтов',
        themeId: uuidv4(),
        date: new Date('2023-11-12T08:45:00'),
    },
    {
        title: 'Введение в TypeScript для JavaScript-разработчиков',
        themeId: uuidv4(),
        date: new Date('2023-11-28T13:55:00'),
    },
    {
        title: 'Разработка серверной части с Node.js и Express',
        themeId: uuidv4(),
        date: new Date('2023-12-15T16:20:00'),
    },
    {
        title: 'Создание базы данных и работа с MongoDB',
        themeId: uuidv4(),
        date: new Date('2024-01-05T10:10:00'),
    },
    {
        title: 'Проектирование RESTful API',
        themeId: uuidv4(),
        date: new Date('2024-01-20T11:45:00'),
    },
    {
        title: 'Деплой приложения на облачный сервер',
        themeId: uuidv4(),
        date: new Date('2024-02-10T14:30:00'),
    },
];

function Sidebar({chatPanel,onChangeIsCollapsed}){
    const historyTheme = useRef(null);
    const sideBarRef = useRef(null)
    const [height,setHeight] = useState(0);
    const [isActive,setIsActive] = useState({show:false,id:themeMessages[0].themeId});

    const [layoutState,setLayoutState] = useState({
        isCollapsed:false,
        isDesktop:false
    })

    const handleHeightChange = (newHeight) => {
        setHeight(newHeight);
    }
    const {mainContentSize, clientWindowSize} = useContext(ScreenSizeContext);
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
    const handleClickTheme = (e) =>{
        const newId = e.currentTarget.dataset.id
        if(isActive.element !== newId){
            setIsActive({
                id: e.currentTarget.dataset.id,
                show:true
            });
        }
    }


    useEffect(()=>{
        if(layoutState.isDesktop && layoutState.isCollapsed){
            const handleTransitionEnd = (e) => {
                if(e.propertyName === 'width'){
                    onChangeIsCollapsed(true)
                }
            }
            sideBarRef.current.addEventListener('transitionend',handleTransitionEnd);
            return () => {
                sideBarRef.current.removeEventListener('transitionend',handleTransitionEnd);
            }
        }

    },[layoutState])

    //Функция скрытия сайдбара
    const handleShowSidebar = (e) => {
        e.currentTarget.blur();
        setTimeout(() => {
            document.activeElement.blur();
        }, 0);
        if(clientWindowSize[0] >= 768){
            setLayoutState(prevState => ({
                ...prevState,
                isDesktop:true,
            }));
            if (sideBarRef.current.classList.contains(`${styles.collapsed}`)) {
                setLayoutState(prevState => ({
                    ...prevState,
                    isCollapsed:false,
                }));
                // chatPanel.current.classList.replace('col-md-11','col-md-9');
                onChangeIsCollapsed(false)

            }else {
                setLayoutState(prevState => ({
                    ...prevState,
                    isCollapsed:true,
                }));
            }
        }else{
            setLayoutState(prevState => ({
                ...prevState,
                isDesktop:false,
            }));
            if (sideBarRef.current.classList.contains(`${styles.collapsedMd}`)) {
                setLayoutState(prevState => ({
                    ...prevState,
                    isCollapsed:false,
                }));
            }else{
                setLayoutState(prevState => ({
                    ...prevState,
                    isCollapsed:true,
                }));
            }
        }
    };
    useEffect(()=>{
        if(themeMessages.length){
            if(clientWindowSize[0] >= 768){
                // console.log('mainContentRef:',chatPanel)
                sideBarRef.current.style.height = mainContentSize + 'px'
                if(height >= historyTheme.current.clientHeight * 0.80){
                    historyTheme.current.style.overflowY = `scroll`;
                }else{
                    historyTheme.current.style.overflowY = `hidden`;
                }
            }else{
                if(height > historyTheme.current.clientHeight * 0.80){
                    historyTheme.current.style.overflowY = `scroll`;
                }else{
                    historyTheme.current.style.overflowY = `hidden`;
                }
            }
        }

    },[height,clientWindowSize,mainContentSize]);
    return (
        <aside
            className={`${styles.sidebar} col-12 
            ${(layoutState.isDesktop && layoutState.isCollapsed) ? styles.collapsed : (!layoutState.isDesktop && layoutState.isCollapsed ? styles.collapsedMd : '')}
            `}
            ref={sideBarRef}>
            <TotalHeightText refComponent={sideBarRef} querySelector='li' onHeightChange={handleHeightChange}/>

            <div className={` ${!layoutState.isDesktop ? 'pt-1 pe-3 pb-0 ps-3' : ''} d-flex ${layoutState.isDesktop && layoutState.isCollapsed ? 'justify-content-end' : 'justify-content-between'} 
            align-items-center`}>
                <h6 className={`sideBarTitle ${layoutState.isDesktop && layoutState.isCollapsed ? 'd-none' : 'd-block'} ${!layoutState.isDesktop ? 'mb-0' : ''}`}
                >История тем общения</h6>
                <Button className='clearButton'>
                    <img src={history} alt='История' className='p-2' style={{width:'2.5rem'}} onClick={handleShowSidebar}/>
                </Button>
            </div>

            <hr className={`mt-1 hr ${layoutState.isCollapsed ? 'd-none' : ''}`}/>

            <ul className=
                    {`
                        ${styles.historyTheme} ps-0 pe-0 pb-0 mb-0
                        ${layoutState.isCollapsed ? 'd-none' : ''}
                    `}
                ref={historyTheme}>
                {themeMessages.length > 0 ? (
                    themeMessages.map((themeMessage, key) => (
                        <li key={key} onClick={handleClickTheme} data-id={themeMessage.themeId}
                            className=
                                {
                            isActive.id === themeMessage.themeId ? styles.active : ''
                                }
                        >
                            <a href="#">
                                <div className="justify-content-between d-flex align-items-center">
                                    <div className="col-7">{themeMessage.title}</div>
                                    <div className="col-5 d-flex align-items-center themeContent">
                                        <div className={`col-12 ${styles.historyThemeTime} pe-2 text-end`}>
                                            {
                                                themeMessage.date.toLocaleDateString('en-CA', {
                                                    day: '2-digit',
                                                    month: '2-digit'
                                                }).replace('-', '.')
                                                + ' ' +
                                                themeMessage.date.toLocaleTimeString('en-CA', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false
                                                })
                                            }
                                        </div>
                                        {isActive.show && isActive.id === themeMessage.themeId && (
                                            <div className={`col-auto ${styles.active_icon}`}></div>
                                        )}
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))
                ) : (
                    <li>Темы отсутствуют</li>
                )}
            </ul>

        </aside>
    )
}

export default Sidebar;