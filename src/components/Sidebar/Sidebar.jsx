import {Button} from "react-bootstrap";
import history from "../../assets/icons/history.png";
import {useEffect, useRef, useState} from "react";
import TotalHeight from "../TotalHeightComponent/TotalHeight.js";
import styles from "./Sidebar.module.css";
// eslint-disable-next-line react/prop-types
function Sidebar({clientWindowSize,mainContentRef}){
    const historyTheme = useRef(null);
    const sideBarRef = useRef(null)
    const [height,setHeight] = useState(0);
    const handleHeightChange = (newHeight) => {
        setHeight(newHeight);
    }
    useEffect(() => {
        console.log('actualHeight:',height);
    }, [height]);

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
                mainContentRef.current.classList.replace('col-md-11','col-md-9');

                setTimeout(() => {
                    sideBarRef.current.classList.replace('col-md-1','col-md-3');
                },200)
            }else {
                document.querySelector(`.sideBarTitle`).style.display = 'none';
                document.querySelector(`.${styles.historyTheme}`).style.display = 'none';
                document.querySelector('.hr').style.display = 'none';
                document.querySelector(`.sidebarHeader`).classList.replace('justify-content-between', 'justify-content-end');
                setTimeout(() => {
                    // eslint-disable-next-line react/prop-types
                    mainContentRef.current.classList.replace('col-md-9','col-md-11');
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
    return (
        <aside className={`${styles.sidebar} col-12 col-md-3`} ref={sideBarRef}>
            <TotalHeight refComponent={sideBarRef} querySelector='li' onHeightChange={handleHeightChange}/>
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
            <ul className={`${styles.historyTheme} ps-0 pe-0`} ref={historyTheme}>
                <li className={styles.active}>
                    <a href="">
                        <div className="justify-content-between d-flex align-items-center">
                            <div className="col-7">Знакомство</div>
                            <div className="col-5 d-flex align-items-center">
                                <div className={`col-12 ${styles.historyThemeTime} pe-2 text-end`}>
                                    02.11 18:17
                                </div>
                                <div className={`col-auto ${styles.active_icon}`}></div>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <div className="justify-content-between d-flex align-items-center">
                            <div className="col-7">Знакомство</div>
                            <div className="col-5 d-flex align-items-center">
                                <div className={`col-12 ${styles.historyThemeTime} pe-2 text-end`}>
                                    02.11 18:17
                                </div>

                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <div className="justify-content-between d-flex align-items-center">
                            <div className="col-7">Знакомство</div>
                            <div className="col-5 d-flex align-items-center">
                                <div className={`col-12 ${styles.historyThemeTime} pe-2 text-end`}>
                                    02.11 18:17
                                </div>

                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <div className="justify-content-between d-flex align-items-center">
                            <div className="col-7">Знакомство</div>
                            <div className="col-5 d-flex align-items-center">
                                <div className={`col-12 ${styles.historyThemeTime} pe-2 text-end`}>
                                    02.11 18:17
                                </div>

                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <div className="justify-content-between d-flex align-items-center">
                            <div className="col-7">Знакомство</div>
                            <div className="col-5 d-flex align-items-center">
                                <div className={`col-12 ${styles.historyThemeTime} pe-2 text-end`}>
                                    02.11 18:17
                                </div>

                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <div className="justify-content-between d-flex align-items-center">
                            <div className="col-7">Знакомство</div>
                            <div className="col-5 d-flex align-items-center">
                                <div className={`col-12 ${styles.historyThemeTime} pe-2 text-end`}>
                                    02.11 18:17
                                </div>

                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar;