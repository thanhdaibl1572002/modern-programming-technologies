import { useState, useEffect } from 'react'

const useMediaScreen = () => {
  const [screenSize, setScreenSize] = useState('')

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return screenSize
}

export default useMediaScreen