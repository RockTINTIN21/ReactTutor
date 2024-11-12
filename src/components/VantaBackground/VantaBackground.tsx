
// @ts-ignore
import NET from "vanta/dist/vanta.net.min"; // Импорт эффекта NET

import {useEffect, useRef} from "react"; // Стиль для компонента
import React from "react";

function VantaBackground() {
    const vantaRef = useRef(null); // Ссылка на DOM-элемент

    useEffect(() => {
        if (!vantaRef.current) return; // Проверка, что ссылка существует
        const isMobile = window.innerWidth <= 768; // Определяем, мобильное устройство или нет

        const vantaEffect = NET({
            el: vantaRef.current,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 10,
            minWidth: 10,
            scale: 1,
            scaleMobile: 1,
            color: 0xe8e8,
            backgroundColor: 0x111111,
            points: isMobile ? 8 : 15, // Уменьшение количества точек на мобильных
            maxDistance: isMobile ? 15 : 20, // Уменьшение максимального расстояния на мобильных
            opacity: isMobile ? 0.05 : 1
        });


        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return <div ref={vantaRef} className="vanta-bg"></div>;
}

export default VantaBackground;
