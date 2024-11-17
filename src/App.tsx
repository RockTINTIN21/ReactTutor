
import Home from './pages/Home/Home.tsx';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Chat from './pages/Chat/Chat.tsx';
import {ScreenSizeProvider} from './contexts/ScreenSizeContext.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import React from 'react';
function App() {

	return (
  <ScreenSizeProvider>
    <Container className="h-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/about"/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Container>
  </ScreenSizeProvider>
	);
}

export default App;
