import Header from "../../components/Header/Header.tsx";

import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

function NotFound(){
    return(
        <div className='home-container h-100'>
            <Helmet><title>ReactTutorAI</title></Helmet>
            <div className="content h-100">
                <Header isMainPage={true}/>
                <div className="main h-100 justify-content-center align-items-center d-flex flex-column">
                    <h1 style={{fontSize: '6rem'}}>404</h1>
                    <h4>Страница еще в разработке или не найдена.</h4>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
