import { CallToAction } from '../components/CallToAction'

export const Projects = () => {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Proyectos</h1>
      <p className='text-md text-gray-500'>A continuación se muestran algunos proyectos</p>
      <CallToAction />
    </div>
  )
}
