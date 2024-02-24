import { Login } from './pages/login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/signup/Signup'
import Home from './pages/home/Home'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/iniciar-sesion' element={ <Login/> }></Route>
        <Route path='/registrarse' element={ <Signup/> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
