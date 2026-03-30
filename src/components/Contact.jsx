import { Button, Input, Link, Spacer, Textarea } from '@nextui-org/react'
import { Map } from './Map'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export const Contact = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isDisabledSend, setIsDisabledSend] = useState(true)
  const [formErrors, setFormErrors] = useState({ name: false, email: false, phone: false, message: false })

  useEffect(() => {
    setIsDisabledSend(
      !(name !== '' 
      && email !==  '' 
      && phone !== ''
      && message !== '')
    )
  }, [name, email, phone, message])
  
  const sendMail = async (e) => {
    e.preventDefault()
    
    name === '' && setFormErrors({ ...formErrors, name: true })
    email === '' && setFormErrors({ ...formErrors, email: true })
    phone === '' && setFormErrors({ ...formErrors, phone: true })
    message === '' && setFormErrors({ ...formErrors, message: true })

    if(name === '' || email === '' || phone === '' || message === '') return

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message })
      })
      if (!response.ok) {
        throw new Error('Error al enviar')
      }
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      toast.success('Mensaje enviado correctamente')
    } catch (err) {
      toast.error('Error al envíar el mensaje')
    }

}
return (
  <div className='pt-32 -mt-16 lg:pt-32 lg:-mt-16 pb-32 max-w-4xl m-auto flex justify-around items-center gap-10 flex-col-reverse lg:flex-row' id='contact'>
    <div className='flex flex-col justify-center items-center sm:items-start self-center sm:w-[400px] gap-6'>
      <div className='w-3/4'>
        <h3 className='text-2xl mb-2 underline'>TE ESPERAMOS</h3>
        <p>Pl. de la Libertad, 5, 13411 Valdemanco del Esteras, Ciudad Real</p>
        <p>Email: <Link href='mailto:elrincon.valdemanco@gmail.com'>elrincon.valdemanco@gmail.com</Link></p>
        <p>Teléfono: <Link href='tel:+34680968872'>680 96 88 72</Link> </p>
      </div>
      <div className='w-full'>
        <Map />
      </div>
    </div>
    <div className='flex flex-col gap-4'>
      <h2 className='text-4xl text-center'>Contacta con nosotros</h2>
      <form onSubmit={sendMail}>
        <Input
          name='name'
          type='text'
          label='*Nombre'
          placeholder='Ingrese su nombre'
          classNames={{ label: 'text-black font-semibold' }}
          value={name}
          onValueChange={setName}
          errorMessage={formErrors.name === true && 'Error, no puede enviar el campo vacío'}
        />
        <Spacer y={2} />
        <Input
          name='email'
          type='email'
          label='*Email'
          placeholder='Ingrese su email'
          classNames={{ label: 'text-black font-semibold' }}
          value={email}
          onValueChange={setEmail}
          errorMessage={formErrors.email === true && 'Error, no puede enviar el campo vacío'}
        />
        <Spacer y={2} />
        <Input
          name='phone'
          type='text'
          label='*Teléfono'
          placeholder='Ingrese su teléfono'
          classNames={{ label: 'text-black font-semibold' }}
          value={phone}
          onValueChange={setPhone}
          errorMessage={formErrors.phone === true && 'Error, no puede enviar el campo vacío'}
        />
        <Spacer y={2} />
        <Textarea
          name='message'
          type='text'
          label='*Mensaje'
          placeholder='Escriba un mensaje'
          minRows={10}
          classNames={{ label: 'text-black font-semibold' }}
          value={message}
          onValueChange={setMessage}
          errorMessage={formErrors.message && 'Error, no puede enviar el campo vacío'}
        />
        <Spacer y={2} />
        <p className='text-xs text-gray-500 italic'>*Campos obligatorios</p>
        <Spacer y={2} />
        <Button type='submit' color='primary' isDisabled={isDisabledSend} >Enviar</Button>
      </form>
    </div>
  </div>
)
}