import React, { useEffect, useState } from 'react';
import {setAnimationStatus} from '../../utils/FetchService.ts';

type AnimationTextType = { text: string,id:string };

function AnimationText({ text,id }: AnimationTextType) {
	const [newText, setNewText] = useState<string>(''); // Устанавливаем пустую строку как начальное значение
	useEffect(() => {
		if (text.length) {
			let index = 0;
			console.log('Вызвана анимация!');
			const animateText = setInterval(() => {
				if (index < text.length) {
					setNewText((prevState) => prevState + text[index++]);
				} else {
					clearInterval(animateText);
					index = 0;
					setAnimationStatus(id);
					// console.log('Вернул false')
				}
			}, 10);
			return () => {
				clearInterval(animateText);
			};
		} else {

			setNewText('');
		}

	}, [text]);

	return newText;
}

export default AnimationText;
