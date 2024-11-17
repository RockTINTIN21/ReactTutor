import Header from '../../components/Header/Header.tsx';
import './Chat.css';
import {Row} from 'react-bootstrap';
import {useState} from 'react';
// @ts-ignore
import Helmet from 'react-helmet';
import Sidebar from '../../components/Sidebar/Sidebar.tsx';
import ChatPanel from '../../components/ChatPanel/ChatPanel.tsx';
import React from 'react';

function Chat() {
	const [sidebarIsCollapsed, setSidebarIsCollapsed] = useState(false);
	const handleChangeIsCollapsed = (isCollapsed: boolean) => setSidebarIsCollapsed(isCollapsed);

	return (
  <div className='h-100 p-3 p-md-0'>
    <Helmet><title>Чат</title></Helmet>
    <Header isMainPage={false}/>
    <Row>
      <Sidebar onChangeIsCollapsed={handleChangeIsCollapsed}/>
      <ChatPanel sidebarIsCollapsed={sidebarIsCollapsed}/>
    </Row>
  </div>

	);
}

export default Chat;
