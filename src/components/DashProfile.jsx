import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Perfil de Usuario</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img src={currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
        </div>
        <TextInput type='text' id='username' placeholder='Escribe tu nombre' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='Escribe tu correo electrónico' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='Escribe una nueva contraseña'/>
        <Button type='submit' gradientDuoTone='greenToBlue' outline>
          Guardar cambios
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Eliminar cuenta</span>
        <span className='cursor-pointer'>Cerrar Sesión</span>
      </div>
    </div>
  )
}
