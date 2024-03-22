import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Projects } from './pages/Projects';
import { Dashboard } from './pages/Dashboard';
import { Header } from './components/Header';

export const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/iniciar-sesion' element={ <SignIn /> } />
        <Route path='/registrarse' element={ <SignUp /> } />
        <Route path='/panel-control' element={ <Dashboard /> } />
        <Route path='/proyectos' element={ <Projects /> } />
        <Route path='/acerca-de' element={ <About /> } />
      </Routes>
    </BrowserRouter>
  )
}
