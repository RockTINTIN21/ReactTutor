
import Home from "./pages/Home/Home.jsx";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {Container} from "react-bootstrap";
import Chat from "./pages/Chat/Chat.jsx";
import {ScreenSizeProvider} from "./contexts/ScreenSizeContext.jsx";
function App() {

    return (
        <ScreenSizeProvider>
            <Container className="h-100">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/chat" element={<Chat/>}/>
                    </Routes>
                </BrowserRouter>
            </Container>
        </ScreenSizeProvider>
    )
}

export default App
