import { Login } from './pages/login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/signup/Signup'
import Home from './pages/home/Home'
import PublicRoute from './routes/publicRoutes/PublicRoute'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/iniciar-sesion' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
          } 
        />
        <Route path='/registrarse' element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
