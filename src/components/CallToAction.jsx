import {Button} from 'flowbite-react';

export const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>¿Quieres aprender a realizar un Diagrama de Flujo?</h2>
        <p className='text-gray-500 my-2'>
          Revisa este video para aprenderlo.
        </p>
        <Button gradientDuoTone='pinkToOrange' className='rounded-tl-xl rounded-bl-none'>
          <a href='https://www.youtube.com/watch?v=TCicw5DDmmI&t=1s' target='_blank' rel='noopener noreferrer'>Ver video de Diagrama de Flujo</a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src='https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_1280.jpg' />
      </div>
    </div>
  )
}
