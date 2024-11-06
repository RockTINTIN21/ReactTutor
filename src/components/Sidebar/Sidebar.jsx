import {Button} from "react-bootstrap";
import history from "../../assets/icons/history.png";
import {useContext, useEffect, useInsertionEffect, useRef, useState} from "react";
import TotalHeightText from "../TotalHeightText/TotalHeightText.js";
import styles from "./Sidebar.module.css";
import { v4 as uuidv4 } from 'uuid';
import {ScreenSizeContext} from "../../contexts/ScreenSizeContext.jsx";
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

function Sidebar({chatPanel}){
    const historyTheme = useRef(null);
    const sideBarRef = useRef(null)
    const [height,setHeight] = useState(0);
    const [isActive,setIsActive] = useState({show:false,element:themeMessages[0],id:null});
    // const [mainContentHeightq,setMainContentHeightq] = useState(null);
    const handleHeightChange = (newHeight) => {
        setHeight(newHeight);
    }
    const {mainContentSize, clientWindowSize} = useContext(ScreenSizeContext);
    // useEffect(() => {
    //     console.log('Хук высоты установлен на:',mainContentHeight)
    // }, [mainContentHeight]);
    useEffect(()=>{
        if(themeMessages.length){
            const firstHistoryTheme = historyTheme.current.querySelectorAll('li')[0]
            firstHistoryTheme.classList.add(styles.active);
            setIsActive(prevState => ({
                ...prevState,
                show:true,
                id: firstHistoryTheme.dataset.id,
                element:firstHistoryTheme,
            }));
        }
    },[])


    const handleClickTheme = (e) =>{
        if(isActive.element !== e.currentTarget && isActive.id !== e.currentTarget.dataset.id){
            isActive.element.classList.remove(styles.active);
            e.currentTarget.classList.add(styles.active);
            setIsActive(prevState => ({
                ...prevState,
                element: e.currentTarget,
                id: e.currentTarget.dataset.id,
                show:true
            }));
        }
    }

    //Функция скрытия сайдбара
    const handleShowSidebar = (e) => {
        e.currentTarget.blur();
        setTimeout(() => {
            document.activeElement.blur();
        }, 0);
        if(clientWindowSize[0] >= 768){
            if (sideBarRef.current.classList.contains(`${styles.collapsed}`)) {
                sideBarRef.current.classList.remove(`${styles.collapsed}`);
                document.querySelector('.sideBarTitle').style.display = 'block';
                document.querySelector(`.${styles.historyTheme}`).style.display = 'block';
                document.querySelector('.sidebarHeader').classList.replace('justify-content-end', 'justify-content-between');
                document.querySelector('.hr').style.display = 'block';
                // eslint-disable-next-line react/prop-types
                chatPanel.current.classList.replace('col-md-11','col-md-9');
                setTimeout(() => {
                    sideBarRef.current.classList.replace('col-md-1','col-md-3');
                },200)
            }else {
                document.querySelector(`.sideBarTitle`).style.display = 'none';
                document.querySelector(`.${styles.historyTheme}`).style.display = 'none';
                document.querySelector('.hr').style.display = 'none';
                document.querySelector(`.sidebarHeader`).classList.replace('justify-content-between', 'justify-content-end');
                setTimeout(() => {
                    chatPanel.current.classList.replace('col-md-9','col-md-11');
                },200)
                sideBarRef.current.classList.replace('col-md-3','col-md-1');
                sideBarRef.current.classList.add(`${styles.collapsed}`);
            }
        }else{
            if (sideBarRef.current.classList.contains(`${styles.collapsedMd}`)) {
                sideBarRef.current.classList.remove(`${styles.collapsedMd}`);
                document.querySelector(`.${styles.historyTheme}`).style.display = 'block';
                document.querySelector('.hr').style.display = 'block';
            }else{
                document.querySelector(`.${styles.historyTheme}`).style.display = 'none';
                document.querySelector('.hr').style.display = 'none';
                sideBarRef.current.classList.add(`${styles.collapsedMd}`);
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
        <aside className={`${styles.sidebar} col-12 col-md-3`} ref={sideBarRef}>
            <TotalHeightText refComponent={sideBarRef} querySelector='li' onHeightChange={handleHeightChange}/>
            <div className={`justify-content-between sidebarHeader align-items-center d-none d-lg-flex `}>
                <h5 className='sideBarTitle'>История тем общения</h5>
                <Button className='clear__button'>
                    <img src={history} alt='История' className='p-2' onClick={handleShowSidebar}/>
                </Button>
            </div>
            <div
                className="d-flex ps-3 sidebarHeaderMd pt-1 pe-3 pb-0 justify-content-between align-items-center d-lg-none">
                <h6 className='mb-0'>История тем общения</h6>
                <Button className='clear__button'>
                    <img src={history} alt='История' className='p-2' onClick={handleShowSidebar}/>
                </Button>
            </div>

            <hr className="mt-1 hr"/>

            <ul className={`${styles.historyTheme} ps-0 pe-0 pb-0 mb-0`} ref={historyTheme}>
                {themeMessages.length > 0 ? (
                    themeMessages.map((themeMessage, key) => (
                        <li key={key} onClick={handleClickTheme} data-id={themeMessage.themeId} >
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