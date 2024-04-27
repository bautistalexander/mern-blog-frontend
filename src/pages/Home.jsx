import { Link } from 'react-router-dom';
import { CallToAction } from '../components/CallToAction';
import { useEffect, useState } from 'react';
import { PostCard } from '../components/PostCard';

export const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, []);

  return (
    <div className=''>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Bienvenido a mi Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Aquí encontrarás una variedad de articulos sobre programación, organización de computadoras y fundamentos digitales</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>Ver todos los Posts</Link>
      </div>
      <div className='p- bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>Posts recientes</h2>
              <div className='flex flex-wrap gap-4'>
                {
                  posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                }
              </div>
              <Link to={'/search'} className='text-teal-500 hover:underline text-center'>Ver todos los Posts</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}
