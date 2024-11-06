import {useEffect} from "react";

function TotalHeightText({refComponent,onHeightChange,querySelector}) {
        useEffect(() => {
            if(refComponent && querySelector){
                const totalHeightObserver = refComponent.current.querySelectorAll(querySelector);
                const resizeObserverComponent = new ResizeObserver((entries) =>{
                    // console.log('Компонент:',refComponent)
                    // console.log('Кол-во тем:',entries.length);
                    let totalHeight = 0;
                    for (let entry of entries) {
                        // console.log('entry:',entry, 'entryHeight:',entry.target.getBoundingClientRect().height)
                        totalHeight += entry.target.getBoundingClientRect().height;
                    }
                    // console.log('totalheight:', totalHeight);
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