import { Opinion } from './Opinion'
import { OPINIONS } from '../data/opinions'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'

export const Opinions = () => {

  return (
    <div className='pt-18 -mt-44 lg:pt-28 lg:-mt-32' id='opinion'>
      <div className='bg-green-200 py-5 skew-y-2'>
        <div className='-skew-y-2 flex justify-center'>
          <Swiper
          modules={[EffectCards, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          effect='cards'
          autoplay
          grabCursor
          >
            {OPINIONS.map(opinion =>
            <SwiperSlide key={opinion.id} virtualIndex={opinion.id}>
              <Opinion name={opinion.name} img={opinion.img} stars={opinion.stars} text={opinion.text} />
            </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  )
}