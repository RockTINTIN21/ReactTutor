import Header from "../../components/Header/Header.tsx";
import './Chat.css';
import {Row} from "react-bootstrap";
import {useState} from "react";
import {Helmet} from "react-helmet";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import ChatPanel from "../../components/ChatPanel/ChatPanel.jsx";

function Chat() {
    const [chatPanelRef, setChatPanelRef] = useState(null);
    const [sidebarIsCollapsed, setSidebarIsCollapsed] = useState(false);
    const handleChangeChatPanel = (chatPanelRef) => setChatPanelRef(chatPanelRef);
    const handleChangeIsCollapsed = (isCollapsed) => setSidebarIsCollapsed(isCollapsed);

    return (
            <div className='h-100 p-3 p-md-0'>
                <Helmet><title>Чат</title></Helmet>
                <Header/>
                <Row>
                    <Sidebar chatPanel={chatPanelRef} onChangeIsCollapsed={handleChangeIsCollapsed}/>
                    <ChatPanel onChangeChatPanel={handleChangeChatPanel} sidebarIsCollapsed={sidebarIsCollapsed}/>
                </Row>
            </div>

    );
}

export default Chat;