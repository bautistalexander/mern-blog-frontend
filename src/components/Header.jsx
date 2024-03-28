import { Link, useLocation } from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { useSelector } from 'react-redux'

export const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user);
  return (
    <Navbar className='border-b-2'>
      <Link to='' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white '>
        <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-lg text-white'>Alexander's</span>
        Blog
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Buscar'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
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
              <Link to='/iniciar-sesion'>
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
