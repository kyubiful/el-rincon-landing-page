const TOAST_DURATION = 4000

export function showToast(message, type = 'success') {
  const root = document.getElementById('toast-root')
  if (!root) return

  const isSuccess = type === 'success'

  const toast = document.createElement('div')
  toast.className = [
    'flex items-center gap-3 rounded-lg shadow-lg px-4 py-3 text-white',
    isSuccess ? 'bg-green-600' : 'bg-red-600',
  ].join(' ')

  const text = document.createElement('p')
  text.className = 'text-sm font-medium'
  text.textContent = message
  toast.appendChild(text)

  const closeBtn = document.createElement('button')
  closeBtn.type = 'button'
  closeBtn.setAttribute('aria-label', 'Cerrar')
  closeBtn.className = 'ml-2 text-white/80 hover:text-white leading-none'
  closeBtn.textContent = '×'
  toast.appendChild(closeBtn)

  const remove = () => {
    toast.remove()
  }

  closeBtn.addEventListener('click', remove)

  root.appendChild(toast)

  setTimeout(remove, TOAST_DURATION)
}
