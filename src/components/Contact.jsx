import { Button, FieldError, Input, Label, TextArea, TextField } from '@heroui/react'
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
        <p>Email: <a className='text-blue-500 hover:underline' href='mailto:elrincon.valdemanco@gmail.com'>elrincon.valdemanco@gmail.com</a></p>
        <p>Teléfono: <a className='text-blue-500 hover:underline' href='tel:+34680968872'>680 96 88 72</a> </p>
      </div>
      <div className='w-full'>
        <Map />
      </div>
    </div>
    <div className='flex flex-col gap-4'>
      <h2 className='text-4xl text-center'>Contacta con nosotros</h2>
      <form onSubmit={sendMail} className='space-y-2'>
        <TextField
          name='name'
          type='text'
          value={name}
          onChange={setName}
          isInvalid={formErrors.name}
        >
          <Label className='text-black font-semibold'>*Nombre</Label>
          <Input placeholder='Ingrese su nombre' />
          {formErrors.name && <FieldError>Error, no puede enviar el campo vacío</FieldError>}
        </TextField>
        <TextField
          name='email'
          type='email'
          value={email}
          onChange={setEmail}
          isInvalid={formErrors.email}
        >
          <Label className='text-black font-semibold'>*Email</Label>
          <Input placeholder='Ingrese su email' />
          {formErrors.email && <FieldError>Error, no puede enviar el campo vacío</FieldError>}
        </TextField>
        <TextField
          name='phone'
          type='text'
          value={phone}
          onChange={setPhone}
          isInvalid={formErrors.phone}
        >
          <Label className='text-black font-semibold'>*Teléfono</Label>
          <Input placeholder='Ingrese su teléfono' />
          {formErrors.phone && <FieldError>Error, no puede enviar el campo vacío</FieldError>}
        </TextField>
        <TextField
          name='message'
          value={message}
          onChange={setMessage}
          isInvalid={formErrors.message}
        >
          <Label className='text-black font-semibold'>*Mensaje</Label>
          <TextArea rows={10} placeholder='Escriba un mensaje' />
          {formErrors.message && <FieldError>Error, no puede enviar el campo vacío</FieldError>}
        </TextField>
        <p className='text-xs text-gray-500 italic'>*Campos obligatorios</p>
        <Button type='submit' variant='primary' isDisabled={isDisabledSend}>Enviar</Button>
      </form>
    </div>
  </div>
)
}
