import { Fragment } from "react";
import Chatview from "./Pages/chatview";
import Login from './Pages/Login';
import Fileview from './Pages/fileview';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>

        {/* Pagina login*/}
        <Route path="/" element={<Login />}></Route>
        
        {/* Pagina Chat */}
        <Route path="/chat" element={<Chatview />} />

        {/* Pagina archivos */}
        <Route path='files' element={<Fileview />} />

      </Routes>
    </Router>

);
}

export default App;
