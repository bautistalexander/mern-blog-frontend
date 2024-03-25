import { Link } from "react-router-dom"
import { Label, TextInput, Button } from 'flowbite-react'
export const SignUp = () => {
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
            Puedes registrarte con tu correo electronico y password o mediante tu cuenta Google.
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Nombre Completo:' />
              <TextInput type='text' placeholder='Escribe tu nombre completo'id='username' />
            </div>
            <div>
              <Label value='Correo Electrónico:' />
              <TextInput type='email' placeholder='Escribe tu correo ej: nombre@compañia.com'id='email' />
            </div>
            <div>
              <Label value='Contraseña:' />
              <TextInput type='password' placeholder='Escribe tu contraseña'id='password' />
            </div>
            <Button type='submit' gradientDuoTone='greenToBlue'>Resgistrarse</Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>¿Ya tienes una cuenta?</span>
            <Link to='/iniciar-sesion' className='text-blue-500'>Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
