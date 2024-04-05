import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Projects } from './pages/Projects';
import { Dashboard } from './pages/Dashboard';
import { CreatePost } from './pages/CreatePost';

import { Header } from './components/Header';
import { FooterComponent } from './components/Footer';
import { PrivateRoute } from './components/PrivateRoute';
import { OnlyAdminPrivateRoute } from './components/OnlyAdminPrivateRoute';
import { UpdatePost } from './pages/UpdatePost';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/iniciar-sesion' element={<SignIn />} />
        <Route path='/registrarse' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/panel-control' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/crear-post' element={<CreatePost />} />
          <Route path='/actualizar-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/proyectos' element={<Projects />} />
        <Route path='/acerca-de' element={<About />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
};
