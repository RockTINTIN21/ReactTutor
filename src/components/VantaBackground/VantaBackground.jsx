
import NET from "vanta/dist/vanta.net.min"; // Импорт эффекта NET

import {useEffect, useRef} from "react"; // Стиль для компонента

function VantaBackground() {
    const vantaRef = useRef(null); // Ссылка на DOM-элемент

    useEffect(() => {
        if (!vantaRef.current) return; // Проверка, что ссылка существует
        const vantaEffect = NET({
            el: vantaRef.current,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xe8e8,
            backgroundColor: 0x111111
        });


        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return <div ref={vantaRef} className="vanta-bg"></div>;
}

export default VantaBackground;
