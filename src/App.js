import { Fragment,useEffect } from "react";
import Chatview from "./Pages/chatview";
import Login from './Pages/Login';
import SignupCustomer from './Pages/SignupCustomer';
import SignupCompany from './Pages/SignupCompany';
import SignupType from './Pages/SignupType';
import Fileview from './Pages/fileview';
import Stripeview from "./Pages/Stripeview";
import Profileview from "./Pages/profile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let home = localStorage.token != undefined ? <Chatview /> : <Login /> ;

  window.addEventListener('storage', () => {
    if(localStorage.token == undefined)
    {
      window.location.href = '/'
    }
  })

  return (
    <Router>
      <Routes>

        {/* Pagina login*/}
        <Route path="/" element={ home }></Route>

        <Route path='/login' element={<Login /> }></Route>
        
        {/* Pagina registro cliente*/}
        <Route path="/type" element={ <SignupType /> }></Route>
        {/* Pagina registro cliente*/}
        <Route path="/signup" element={ <SignupCustomer /> }></Route>
        {/* Pagina registro compañia*/}
        <Route path="/business" element={ <SignupCompany /> }></Route>
        
        {/* Pagina Chat */}
        <Route path="/chat" element={<Chatview />} />

        {/* Pagina Profile */}
        <Route path="/profile" element={<Profileview />} />

        {/* Pagina archivos */}
        <Route path='files' element={<Fileview />} />

        {/* Pagina de pagos Stripe */}
        <Route path='/stripe' element={<Stripeview />} />

      </Routes>
    </Router>

);
}

export default App;
