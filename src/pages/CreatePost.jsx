import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Crear un  Post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Escribir título' id='title' className='flex-1' required />
          <Select>
            <option value='uncategorized'>Seleccionar una Categoria</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='fundamentosDigitales'>Fundamentos Digitales</option>
            <option value='organizacionComputadoras'>Organización de Computadoras</option>

          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-200 border-dotted p-3'>
          <FileInput type='file' accept='image/*' />
          <Button type='button' gradientDuoTone='redToYellow' size='sm' outline>Subir imagen</Button>
        </div>
        <ReactQuill theme='snow' placeholder='Escribe detalles...' className='h-72 mb-12' />
        <Button type='submit' gradientDuoTone='purpleToBlue'>Publicar</Button>
      </form>
    </div>
  )
}
