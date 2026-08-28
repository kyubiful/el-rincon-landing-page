import { Avatar, Card } from '@heroui/react'
import { Star, HalfStar, EmptyStar } from './Icons'

const getInitials = (name) =>
  name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()

export const Opinion = ({ name, text, stars }) => {
  const convertToArray = () => {
    let array = []
    for (let i = 1; i <= 5; i++) {
      i <= stars && stars - i !== 0.5 && array.push('rated')
      stars - i === 0.5 && array.push('midrated')
      i > stars && array.push('unrated')
    }
    return array
  }

  return (
    <div className='flex flex-col justify-center items-center h-full px-12 py-28 max-w-2xl m-auto'>
        <Avatar className="-mb-14 w-24 h-24 ring-2 ring-green-800 bg-green-800">
          <Avatar.Fallback className="text-white text-3xl">{getInitials(name)}</Avatar.Fallback>
        </Avatar>
        <Card className='max-w-none m-2'>
          <div className='h-14' />
          <Card.Content className='flex flex-col justify-center gap-2 items-center pt-0'>
            <p className='text-3xl text-center mt-2 text-gray-800'>{name}</p>
            <div className='h-72 lg:h-44 flex items-center'>
              <p className='text-md text-gray-800'>"{text}"</p>
            </div>

            <div className='flex gap-1 mt-2 mb-2'>
              {
                convertToArray().map((star, index) =>
                  star === 'rated' ?
                    <Star width={30} height={30} fill='warning' key={index} />
                  : star === 'midrated' ?
                    <HalfStar width={30} height={30} fill='warning' key={index} />
                  :
                    <EmptyStar width={30} height={30} fill='warning' key={index} />
                )
              }
            </div>
          </Card.Content>
        </Card>
    </div>
  )
}
