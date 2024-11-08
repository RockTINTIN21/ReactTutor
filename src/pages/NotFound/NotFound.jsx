import Header from "../../components/Header/Header.jsx";

import {Helmet} from "react-helmet";

function NotFound(){
    return(
        <div className='home-container h-100'>
            <Helmet><title>ReactTutorAI</title></Helmet>
            <div className="content h-100">
                <Header/>
                <div className="main h-100 justify-content-center align-items-center d-flex flex-column">
                    <h1>404</h1>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
