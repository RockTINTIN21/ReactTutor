import React, {Dispatch, SetStateAction, useContext, useEffect, useRef, useState} from 'react';
import styles from './LaunchChat.module.css';

import {Button, Row} from 'react-bootstrap';
import {ScreenSizeContext} from '../../contexts/ScreenSizeContext.tsx';
import {
	checkIsAnimationStatus,
	getAllDataUser,
	sendMessage,
	setIsNewChat,
	setNewStartStage
} from '../../utils/FetchService.ts';
type layoutStateButtonsType = {
    isShowStartButton:boolean;
    isShowStartButtonStyle:boolean;
    isShowLevelButtons:boolean;
    isShowLevelButtonStyles:boolean;
}
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
	startStage:number;
	isNewChat: boolean;
	historyChat: Message[];
};

type LaunchChat = {
	userData:UserData
}
// eslint-disable-next-line no-redeclare
function LaunchChat({userData}:LaunchChat) {
	const [handleCounter,setHandleCounter] = useState<number>(0);
	const startButtonRef = useRef<HTMLButtonElement>(null!);
	const [layoutStateButtons,setLayoutStateButtons] = useState<layoutStateButtonsType>({
		isShowStartButton:false,
		isShowStartButtonStyle:false,
		isShowLevelButtons:false,
		isShowLevelButtonStyles:false,
	});
	// const [isShowFirstMessage,setIsShowFirstMessage] = useState<boolean>(false)// useEffect(()=>{
	//     handleShowFirstMessage(true)
	// },[isShowFirstMessage])


	useEffect(() => {
		const startStage = userData.startStage;
		switch (startStage){
			case 0:
				sendMessage('Нажмите кнопку ниже, что бы начать общение.',true);
				checkIsAnimationStatus(0)
					.then(()=>{
						setTimeout(()=>{
							setNewStartStage(1);
						},300);
					})
					.catch((error)=>{
						console.log('error',error);
					});

				break;
			case 1:
				checkIsAnimationStatus(0)
					.then(()=>{
						setTimeout(()=>{
							setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
								...prevState,
								isShowStartButton:true,
							}));
							setTimeout(()=>{
								setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
									...prevState,
									isShowStartButtonStyle:true,
								}));
							},300);
							setNewStartStage(1);
						},300);
					})
					.catch((error)=>{
						console.log('error',error);
					});

				break;

			case 2:
				checkIsAnimationStatus(2)
					.then(()=>{
						setTimeout(()=>{
							setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
								...prevState,
							}));
							setNewStartStage(3);
						},300);
					})
					.catch((error)=>{
						console.log('error',error);
					});
				console.log('stage:',startStage);
				break;
			case 3:
				setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
					...prevState,
					isShowLevelButton:true,
				}));
				setTimeout(()=>{
					setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
						...prevState,
						isShowLevelButtonStyles:true,
					}));
				},300);
				break;
		}
		// if(getAllDataUser().startStage === 0){
		// 	sendMessage('Нажмите кнопку ниже, что бы начать общение.',true);
		// 	checkIsAnimationStatus(0)
		// 		.then(()=>{
		// 			setTimeout(()=>{
		// 				setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
		// 					...prevState,
		// 					isShowStartButtonStyle:true,
		// 				}));
		// 			},300);
		// 		})
		// 		.catch((error)=>{
		// 			console.log('error',error);
		// 		});
		// }
		// setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
		// 	...prevState,
		// 	isShowStartButton:true,
		// }));
		// setTimeout(()=>{
		// 	setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
		// 		...prevState,
		// 		isShowStartButtonStyle:true,
		// 	}));
		// },300);
	}, [userData.startStage]);


	const onStartChat = (e:React.MouseEvent<HTMLButtonElement>) =>{

		if(e.currentTarget.textContent){
			sendMessage(e.currentTarget.textContent,false);
			setTimeout(()=>{
				sendMessage(
					`Привет! Я твой помощник в изучении фронтенд-разработки.
                Я помогу тебе освоить HTML, CSS, JavaScript и React шаг за шагом.

                Для начала давай разберёмся, с чем ты уже знаком, чтобы я мог предложить тебе подходящие задания.

                Выбери, с чего хочешь начать:
                - HTML
                - CSS
                - JavaScript
                - React
                - Я только начинаю

                Не переживай, мы двигаемся в твоём темпе, и всегда можно вернуться к любой теме!`,
					true,
				);
			},300);
		}
        // setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
        //     ...prevState,
        //     isShowStartButtonStyle:false,
        // }));

		setTimeout(()=>{

            setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
                ...prevState,
                isShowStartButtonStyle:false,
            }));
            setTimeout(()=>{
                setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
                    ...prevState,
                    isShowStartButton:false,
                }));
            },300);
			checkIsAnimationStatus(2)
				.then(()=>{
                    setTimeout(()=>{
                        setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
                            ...prevState,
                            isShowLevelButtonStyles:true,
                        }));
                    },300);
					setNewStartStage(2);
				})
				.catch((error)=>{
					console.log('error',error);
				});
		},300);

		// const test = async () => {
		//     console.log("test")
		//     // setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
		//     //     ...prevState,
		//     //     isShowStartButtonStyle:false,
		//     //     isShowLevelButtons:true
		//     // }))
		// }
		// const runFunctions = async () =>{
		//     const animationStatus = await checkIsAnimation();
		//     if(animationStatus){
		//         await test()
		//     }else{
		//         console.log("Анимация не завершена, test не вызывается.");
		//     }
		// }
		// runFunctions()
	};
	const handleTransitionEndStartButton = () =>{
		setHandleCounter(prevCounter=>prevCounter + 1);
		if(handleCounter === 1){
			setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
				...prevState,
				isShowStartButton:false,
				isShowLevelButton:true,

			}));
		}
	};
	// useEffect(() => {
	//     console.log(handleCounter)
	// }, [handleCounter]);

	const onClickLevelButtons = (e:React.MouseEvent<HTMLButtonElement>) =>{

		setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
			...prevState,
			isShowLevelButtonStyles:false,
		}));
		console.log(e.currentTarget.textContent);
		// sendMessageFromUser(e)
		setTimeout(()=>{
			setLayoutStateButtons((prevState:layoutStateButtonsType) => ({
				...prevState,
				isShowLevelButton:false,
			}));
		},300);
		if(e.currentTarget.textContent){
			sendMessage(e.currentTarget.textContent,false);
			setTimeout(()=>{
				setIsNewChat(false);
			},300);
		}

	};

	return (
		layoutStateButtons.isShowStartButton ? (
  <Button className={`w-100 mb-3 mb-md-0 ${styles.btnStart} ${styles.btnsStart}
            ${layoutStateButtons.isShowStartButtonStyle && styles.btnsStartShow}`} onClick={onStartChat}
    ref={startButtonRef} onTransitionEnd={handleTransitionEndStartButton}>Начать беседу</Button>
		) : (
  <Row className="p-3 d-flex gap-3 mb-3 mb-md-0">
    <Button className={`col-12  mb-md-2 ${styles.btnStarter} ${styles.btnsStart} 
                ${layoutStateButtons.isShowLevelButtonStyles && styles.btnsStartShow}`} onClick={onClickLevelButtons}>
      Я только начинаю
    </Button>
    <Button className={`col btn ${styles.btnHtmlCss} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtonStyles && styles.btnsStartShow}`}
      onClick={onClickLevelButtons}>
      HTML/CSS
    </Button>
    <Button className={`col btn ${styles.btnJs} ${styles.btnsStart} 
                ${layoutStateButtons.isShowLevelButtonStyles && styles.btnsStartShow}`} onClick={onClickLevelButtons}>
      JS/TypeScript
    </Button>
    <Button className={`col btn ${styles.btnReact} ${styles.btnsStart} ${layoutStateButtons.isShowLevelButtonStyles && styles.btnsStartShow}`} onClick={onClickLevelButtons}>
      React
    </Button>
  </Row>
		)
	);
}
export default LaunchChat;
