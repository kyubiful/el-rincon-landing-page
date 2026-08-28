import { useState } from 'react'
import { CardImage } from './Cards/CardImage'
import { GalleryModal } from './Modals/GalleryModal'
import { Button } from '@heroui/react'
import { GALLERY } from '../data/gallery'
import { Collapse } from '@mui/material'

export const Gallery = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [imageOpen, setImageOpen] = useState(0)
  const [morePhotos, setMorePhotos] = useState(false)

  const handlePress = ({ id }) => {
    setImageOpen(id)
    setModalOpen(!modalOpen)
  }

  const handleClose = () => {
    setModalOpen(false)
    setImageOpen(0)
  }

  const handleMorePhotos = () => {
    setMorePhotos(true)
  }

  return (
    <div className='bg-green-200 -skew-y-3 z-0 relative -mt-14 py-32'>
      <div className='max-w-4xl sm:w-3/4 flex justify-center m-auto py-24 skew-y-3' id='gallery'>
        <div className='flex flex-col justify-center items-center gap-10 w-full'>
          <div className='flex justify-center items-center mx-12'>
            <h2 className='text-6xl text-center text-gray-700'>Galería de Fotos</h2>
          </div>
          <Collapse orientation='vertical' collapsedSize={600} in={morePhotos} timeout={{ enter: 500 }}>
            <div className={`w-full sm:w-auto grid grid-cols-1 gap-4 lg:gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden p-10`}>
              <div className='space-y-4'>
                {
                  GALLERY.map((image) => image.id < 3 && <CardImage key={image.id} url={image.url} position={image.id} handlePress={() => handlePress({id: image.id})}/>)
                }
                <div className='sm:hidden flex justify-center'>
                  <Button variant="tertiary" className="bg-green-100 text-green-800 hover:bg-green-200" onPress={() => handlePress({id: 4})}>Ver más imágenes</Button>
                </div>
              </div>
              <div className='space-y-4 hidden sm:block'>
                {
                  GALLERY.map((image) => image.id >= 3 && image.id <=5 && <CardImage key={image.id} url={image.url} position={image.id} handlePress={() => handlePress({id: image.id})}/>)
                }
              </div>
              <div className='space-y-4 hidden lg:block'>
                {
                  GALLERY.map((image) => image.id > 5 && <CardImage key={image.id} url={image.url} position={image.id} handlePress={() => handlePress({id: image.id})}/>)
                }
              </div>
            </div>
          </Collapse>
          <div className='bg-gradient-to-b from-transparent to-green-200 -mt-24 h-24 w-full z-10 flex justify-center'>
            { morePhotos ? null : <Button variant="primary" className="-mt-5 shadow-lg" onPress={handleMorePhotos}>Ver más</Button> }
          </div>
        </div>
      </div>
      <GalleryModal handleClose={handleClose} isOpen={modalOpen} images={GALLERY} imageOpenId={imageOpen} />
    </div>
  )
}