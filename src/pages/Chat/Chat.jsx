import Header from "../../components/Header/Header.jsx";
import './Chat.css';
import {Row} from "react-bootstrap";
import {useState} from "react";
import {Helmet} from "react-helmet";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import ChatPanel from "../../components/ChatPanel/ChatPanel.jsx";

function Chat() {
    const [chatPanelRef, setChatPanelRef] = useState(null);
    const handleChangeChatPanel = (chatPanelRef) => {
        setChatPanelRef(chatPanelRef);}
    return (
            <div className='h-100 p-3 p-md-0'>
                <Helmet><title>Чат</title></Helmet>
                <Header/>
                <Row>
                    <Sidebar chatPanel={chatPanelRef}/>
                    <ChatPanel onChangeChatPanel={handleChangeChatPanel}/>
                </Row>
            </div>

    );
}

export default Chat;