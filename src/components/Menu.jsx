import { House } from './Icons'

export const Menu = () => {

  return (
    <nav className='-mb-16 flex items-center justify-between px-6 h-16'>
      <div className='flex items-center gap-1'>
        <House width={23} height={23}/>
        <p className="font-bold text-inherit">El Rincón</p>
      </div>
      <div className="hidden sm:flex gap-4">
        <a className='text-gray-900' href="/#home">
          Inicio
        </a>
        <a className='text-green-600' href="/#gallery" aria-current="page">
          Fotos
        </a>
        <a className='text-gray-900' href="/#info">
          Características
        </a>
        <a className='text-gray-900' href="/#opinion">
          Opiniones
        </a>
      </div>
      <div className='hidden sm:flex'>
        <a
          href="/#contact"
          className="inline-flex items-center rounded-lg px-4 py-2 bg-green-100 text-green-800 hover:bg-green-200"
        >
          Contacto
        </a>
      </div>
    </nav>
  )
}
