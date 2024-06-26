import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { OAuth } from '../components/OAuth';

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Por favor, llenar todos los campos'));
      // return setErrorMessage('Por favor, debe llenar todos los campos');
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch('/api/auth/iniciar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }
      // setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      // setErrorMessage(error.message);
      // setLoading(false);
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Left */}
        <div className='flex-1'>
          <Link to='' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-lg text-white'>Alexander's</span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            Puedes iniciar sesión escribiendo tu correo electronico y password o mediante tu cuenta Google.
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Correo Electrónico:' />
              <TextInput type='email' placeholder='Escribe tu correo ej: nombre@compañia.com' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Contraseña:' />
              <TextInput type='password' placeholder='Escribe tu contraseña' id='password' onChange={handleChange} />
            </div>
            <Button type='submit' gradientDuoTone='greenToBlue' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Iniciando...</span>
                  </>
                ) : 'Iniciar Sesión'
              }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>¿No tienes una cuenta?</span>
            <Link to='/registrarse' className='text-blue-500'>regístrate</Link>
          </div>

          {errorMessage && (<Alert className='mt-5' color='failure'>{errorMessage}</Alert>)}
        </div>
      </div>
    </div>
  )
}
