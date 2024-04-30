import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export const Header = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/buscar?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2'>
      <Link to='' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white '>
        <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-lg text-white'>Alexander's</span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Buscar'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {
            theme === 'light' ? <FaSun /> : <FaMoon />
          }
        </Button>
        {
          currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt='user'
                  img={currentUser.profilePicture}
                  rounded
                />
              }>
              <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
              </Dropdown.Header>
              <Link to='/panel-control?tab=perfil'>
                <Dropdown.Item>Perfil</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Link to='/iniciar-sesion' onClick={handleSignout}>
                <Dropdown.Item>Cerrar Sesión</Dropdown.Item>
              </Link>
            </Dropdown>
          ) : (
            <Link to='/iniciar-sesion'>
              <Button gradientDuoTone='greenToBlue' outline>
                Iniciar Sesión
              </Button>
            </Link>
          )
        }

        <NavbarToggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Principal</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/proyectos'} as={'div'}>
          <Link to='/proyectos'>Proyectos</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/acerca-de'} as={'div'}>
          <Link to='/acerca-de'>Acerca de</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
