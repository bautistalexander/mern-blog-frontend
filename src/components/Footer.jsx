import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsGithub, BsWhatsapp, BsYoutube } from 'react-icons/bs'
export const FooterComponent = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white '>
              <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-lg text-white'>Alexander's</span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='Acerca de' />
              <Footer.LinkGroup col>
                <Footer.Link href='' target='_blank' rel='noopener noreferrer'>
                  Proyectos
                </Footer.Link>
                <Footer.Link href='' target='_blank' rel='noopener noreferrer'>
                  Videos
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Síguenos' />
              <Footer.LinkGroup col>
                <Footer.Link href='' target='_blank' rel='noopener noreferrer'>
                  GitHub
                </Footer.Link>
                <Footer.Link href='' target='_blank' rel='noopener noreferrer'>
                  Facebook
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='' target='_blank' rel='noopener noreferrer'>
                  Políticas de Privacidad
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='#' by="Alexander's Blog" year={new Date().getFullYear()} />
          <div className='flex gap-6 mt-4 sm:mt-0 sm:justify-center'>
            <Footer.Icon href='#' target='_blank' icon={BsFacebook} />
            <Footer.Icon href='https://www.youtube.com/channel/UCT-bK0QfO_Da1_2_h5ZjRyg' target='_blank' icon={BsYoutube} />
            <Footer.Icon href='https://github.com/bautistalexander' target='_blank' icon={BsGithub} />
            <Footer.Icon href='#' target='_blank' icon={BsWhatsapp} />
          </div>
        </div>
      </div>
    </Footer>
  )
}
