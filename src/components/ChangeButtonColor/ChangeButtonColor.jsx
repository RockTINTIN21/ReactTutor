import {Button} from "react-bootstrap";
import './ChangeButtonColor.css';
function ChangeButtonColor({path, alt, isSubmit}) {
    if(isSubmit){
        return (
            <Button className='clear__button__submit'>
                <img src={path} alt={alt}/>
            </Button>
        );
    }else{
        return (
            <Button className='clear__button'>
                <img src={path} alt={alt}/>
            </Button>
        )
    }

}

export default ChangeButtonColor;