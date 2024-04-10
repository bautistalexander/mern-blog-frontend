import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Button, Textarea } from 'flowbite-react';
import { useState } from 'react';

export const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id
        })
      });

      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
      }

    } catch (error) {
      setCommentError(error.message);
    }
  };
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {
        currentUser ?
          (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
              <p>Iniciaste sesión como:</p>
              <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt='' />
              <Link to={'/panel-control?tab=perfil'} className='text-xs text-cyan-600 hover:underline'>
                @{currentUser.username}
              </Link>
            </div>
          ) : (
            <div className='text-sm text-teal-500 my-5 flex gap-1'>
              Debes iniciar sesión para comentar.
              <Link to={'/iniciar-sesion'} className='text-blue-500 hover:underline'>
                Iniciar Sesión
              </Link>
            </div>
          )
      }
      {
        currentUser && (
          <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
            <Textarea placeholder='Escribe tu comentario...' rows='3' max='200' onChange={(e) => setComment(e.target.value)} value={comment} required />
            <div className='flex justify-between items-center mt-5'>
              <p className='text-gray-500 text-xs'>{200 - comment.length} caracteres restantes</p>
              <Button type='submit' gradientDuoTone='tealToLime' outline>Enviar</Button>
            </div>
            {
              commentError && (
                <Alert color='failure' className='mt-5'>{commentError}</Alert>
              )
            }
          </form>
        )
      }
    </div>
  )
}