import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const DashSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
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
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/panel-control?tab=perfil'>
            <Sidebar.Item active={tab === 'perfil'} icon={HiUser} labelColor={ currentUser.isAdmin ? 'green' : 'blue'} as='div' label={ currentUser.isAdmin ? 'Admin' : 'User'}>
              Perfil
            </Sidebar.Item>
          </Link>
          {
            currentUser.isAdmin && (
              <Link to='/panel-control?tab=posts'>
                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                  Posts
                </Sidebar.Item>
              </Link>
            )
          }
          {
            currentUser.isAdmin && (
              <Link to='/panel-control?tab=usuarios'>
                <Sidebar.Item active={tab === 'usuarios'} icon={HiOutlineUserGroup} as='div'>
                  Usuarios
                </Sidebar.Item>
              </Link>
            )
          }
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
            Cerrar Sesión
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
