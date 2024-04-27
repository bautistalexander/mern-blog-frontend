import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DashSidebar } from '../components/DashSidebar';
import { DashProfile } from '../components/DashProfile';
import { DashPosts } from '../components/DashPosts';
import { DashUsers } from '../components/DashUsers';
import { DashComments } from '../components/DashComments';
import { DashboardComp } from '../components/DashboardComp';

export const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      
      {/* Perfil */}
      {tab === 'perfil' && <DashProfile />}

      {/* Posts */}
      {tab === 'posts' && <DashPosts />}
      
      {/* Usuarios */}
      {tab === 'usuarios' && <DashUsers />}
      
      {/* Comments */}
      {tab === 'comentarios' && <DashComments />}
      
      {/* Dashboard component */}
      {tab === 'tablero' && <DashboardComp />}
    </div>
  )
}
