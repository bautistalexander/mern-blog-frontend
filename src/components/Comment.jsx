import { useEffect, useState } from 'react';
import moment from 'moment';

export const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  // console.log(moment.locale());
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/getuser/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img className='h-10 w-10 object-cover rounded-full bg-gray-200' src={user.profilePicture} alt={user.username} />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : 'Usuario Anónimo'}</span>
          <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className='text-gray-700 pb-2'>{comment.content}</p>
      </div>
    </div>
  )
}