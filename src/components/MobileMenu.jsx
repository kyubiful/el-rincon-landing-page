import { Button, Dropdown, Label } from '@heroui/react'
import { Menu } from './Icons/Menu'

export const MobileMenu = () => {
  return (
    <nav>
      <Dropdown>
        <Button
          aria-label="Abrir menú"
          className="sm:hidden fixed bottom-5 right-5 z-30 rounded-full h-20 w-20 bg-green-600 text-white shadow-lg"
        >
          <Menu width={35} height={35} fill="#fff" />
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu
            aria-label="Acciones del menú"
            onAction={(id) => document.querySelector(`#${id}`).scrollIntoView()}
          >
            <Dropdown.Item id="home" textValue="Inicio"><Label>Inicio</Label></Dropdown.Item>
            <Dropdown.Item id="gallery" textValue="Fotos"><Label>Fotos</Label></Dropdown.Item>
            <Dropdown.Item id="info" textValue="Características"><Label>Características</Label></Dropdown.Item>
            <Dropdown.Item id="opinion" textValue="Opiniones"><Label>Opiniones</Label></Dropdown.Item>
            <Dropdown.Item id="contact" textValue="Contacto"><Label>Contacto</Label></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </nav>
  )
}
