import {RefObject, useEffect} from "react";
type TotalHeightTextType = {
    refComponent: RefObject<HTMLElement>,
    onHeightChange:(height: number) => void,
    querySelector: string
}
function TotalHeightText({refComponent,onHeightChange,querySelector}:TotalHeightTextType) {
        useEffect(() => {
            if(refComponent.current && querySelector){
                const totalHeightObserver = refComponent.current.querySelectorAll(querySelector);
                const resizeObserverComponent = new ResizeObserver((entries) =>{
                    let totalHeight = 0;
                    for (let entry of entries) {
                        totalHeight += entry.target.getBoundingClientRect().height;
                    }
                    onHeightChange(totalHeight)
                });
                totalHeightObserver.forEach((theme)=>resizeObserverComponent.observe(theme));
                return () => {
                    totalHeightObserver.forEach((theme)=>resizeObserverComponent.unobserve(theme));
                    resizeObserverComponent.disconnect();
                }
            }
        },[refComponent,querySelector,onHeightChange]);
    return null
}
export default TotalHeightText;