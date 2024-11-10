import {useEffect} from "react";

function TotalHeightText({refComponent,onHeightChange,querySelector}) {
        useEffect(() => {
            if(refComponent && querySelector){
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