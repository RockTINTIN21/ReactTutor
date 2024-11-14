import React, { useEffect, useState } from "react";

type AnimationTextType = { text: string };
function AnimationText({ text }: AnimationTextType) {
    const [newText,setNewText] = useState<string>();
    let test
    console.log('textLength:',text.length);
    for(let i:number = 0; i < text.length; i++) {
            console.log(i)
            test = (prevState:string) => prevState + text[i];
            console.log(test)

    }
    // useEffect(() => {
    //     console.log(text)
    // },[text])
}
export default AnimationText;


