
import Home from "./pages/Home/Home.jsx";
import {Routes, Route, useLocation, BrowserRouter} from 'react-router-dom';
import {Container} from "react-bootstrap";
function App() {


  return (
    <Container>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </Container>
  )
}

export default App
