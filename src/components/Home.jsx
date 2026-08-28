import { Card } from "@heroui/react"
import { House } from "./Icons"

export const Home = () => {
  return (
		<div
      className='bg-[url(/assets/img/home.webp)] h-screen w-screen bg-cover bg-center bg-no-repeat z-10 relative flex justify-center items-center'
      id='home'
    >
      <div id="homeCard" className="opacity-0">
        <Card className="backdrop-blur-md bg-white/60">
          <Card.Content className="flex flex-row gap-3 items-center p-6">
            <div className='hidden md:block '>
              <House width={175} height={175}/>
            </div>
            <div className='block md:hidden'>
              <House width={100} height={100}/>
            </div>
            <div>
              <p className='text-lg md:text-4xl text-gray-800'>Casa Rural</p>
              <p className='text-5xl md:text-9xl text-gray-800'>El Rincón</p>
            </div>
          </Card.Content>
        </Card>
      </div>
		</div>
  )
}
