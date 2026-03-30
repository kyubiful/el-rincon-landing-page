export const CardImage = ({ url, handlePress }) => {
  return (
    <button
      type='button'
      onClick={handlePress}
      className='w-full rounded-xl overflow-hidden shadow-sm hover:scale-[1.02] transition-transform cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
    >
      <img
        alt='Imagen de la casa rural'
        className='w-full object-cover rounded-xl'
        src={url}
        loading='lazy'
      />
    </button>
  )
}
