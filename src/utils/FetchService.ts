import {v4 as uuidv4} from "uuid";
import userAvatar from "../assets/icons/avatar.png";
import {useEffect, useState} from "react";

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

export const setIsNewChat = (isNewChat:boolean) =>{
    const storedData = localStorage.getItem('userData');
    const userData = storedData ? JSON.parse(storedData) : false;
    if(userData){
        userData.isNewChat = isNewChat
        localStorage.setItem('userData',JSON.stringify(userData))
        // console.log('Успешно изменен!',JSON.parse(localStorage.getItem('userData') || "{}"))
    }
}

// console.log('userData:',userData)
export const setAnimationStatus = (messageID:string) =>{
    const storedData = localStorage.getItem('userData');
    const userData = storedData ? JSON.parse(storedData) : false;
    if(userData){
        const currentMessageIndex = userData.historyChat.findIndex((message:Message)=> message.messageID === messageID)
        // console.log(currentMessageIndex)
        if(currentMessageIndex !== -1){
            // console.log('index:',currentMessageIndex)
            userData.historyChat[currentMessageIndex].isAnimation = false
            localStorage.setItem('userData',JSON.stringify(userData))
            console.log('Успешно изменен!',JSON.parse(localStorage.getItem('userData') || "{}").historyChat[currentMessageIndex])
            // checkIsAnimationStatus(currentMessageIndex,true)
        }else{
            throw new Error('Ошибка, сообщение с таким ID не найдено')
        }
    }
}



// export const checkIsAnimationStatus = (indexInArray:number) =>{
//     const storedData = localStorage.getItem('userData');
//     const userData = storedData ? JSON.parse(storedData) : false;
//     if(userData){
//         if(userData.historyChat[indexInArray]){
//             console.log('isAnimation:',userData.historyChat[indexInArray].isAnimation)
//             return userData.historyChat[indexInArray].isAnimation
//         }else{
//             throw new Error('Ошибка, сообщение с таким номером индекса в массиве не найдено')
//         }
//         // localStorage.setItem('userData',JSON.stringify(userData))
//         // console.log('Успешно изменен!',JSON.parse(localStorage.getItem('userData') || "{}"))
//     }
// }
export const checkIsAnimationStatus = async (indexInArray:number) =>{
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const storedData = localStorage.getItem('userData');
            const userData = storedData ? JSON.parse(storedData) : false;
            if (userData && userData.historyChat[indexInArray]) {
                const isAnimation = userData.historyChat[indexInArray].isAnimation;
                if (isAnimation === false) {
                    clearInterval(interval);
                    resolve(isAnimation);
                }
            } else {
                clearInterval(interval);
                reject(new Error('Сообщение с таким индексом не найдено'));
            }
        }, 100);
    });
}

export const getAllDataUser = () =>{
    const storedData = localStorage.getItem('userData');
    const userData = storedData ? JSON.parse(storedData) : false;
    if(userData){
        // console.log('уже есть!')
        return userData
    }else{
        // console.log('Еще нету, создаю...')
        // console.log('userData:',userData)
        const newUserData:UserData =
            {
                userID: uuidv4(),
                username:'RockTINTIN21',
                userAvatar:userAvatar,
                isNewChat:true,
                historyChat:[
                    // {
                    //     text: 'Привет!',
                    //     date: new Date(),
                    //     isReactTutor:false,
                    //     isAnimation:false,
                    //     messageID:uuidv4()
                    // },
                    // {
                    //     text: 'Теперь вы можете добавлять новые объекты в historyOfMessages, и TypeScript будет проверять тип каждого объекта в массиве.',
                    //     date: new Date(),
                    //     isReactTutor:true,
                    //     isAnimation:false,
                    //     messageID:uuidv4()
                    // },
                    // {
                    //     text: ' message.date.toLocaleDateString(\'en-CA\', {\n' +
                    //         '                                    hour: \'2-digit\',\n' +
                    //         '                                    minute: \'2-digit\',\n' +
                    //         '                                    hour12: false\n' +
                    //         '                                }).replace(\'-\', \':\')\n' +
                    //         'как выводить только часы и минуты',
                    //     date: new Date(),
                    //     isReactTutor:false,
                    //     isAnimation:false,
                    //     messageID:uuidv4()
                    // },
                    {
                        text: 'Нажми кнопку ниже, что бы начать общение',
                        date: new Date(),
                        isReactTutor:true,
                        isAnimation:true,
                        messageID:uuidv4()
                    },
                ]
            }
        localStorage.setItem('userData',JSON.stringify(newUserData))
        return JSON.parse(localStorage.getItem('userData') || '{}')
    }
}
export const sendMessage = (text:string,isReactTutor:boolean) =>{
    const storedData = localStorage.getItem('userData');
    const userData = storedData ? JSON.parse(storedData) : false;
    if(userData){
        if(isReactTutor){
            const newMessage: Message = {
                isAnimation:true,
                isReactTutor:true,
                messageID:uuidv4(),
                date:new Date(),
                text:text
            }
            userData.historyChat.push(newMessage)
            localStorage.setItem('userData',JSON.stringify(userData))
        }else{
            const newMessage: Message = {
                isAnimation:false,
                isReactTutor:false,
                messageID:uuidv4(),
                date:new Date(),
                text:text
            }
            userData.historyChat.push(newMessage)
            localStorage.setItem('userData',JSON.stringify(userData))
        }
        // console.log('Сообщение добавлено!')
    }
}

