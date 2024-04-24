import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

const useResponsive = () => {
  // screen resolutions
  const [state, setState] = useState<{
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    width: number
    height: number
  }>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
    height: 0
  })

  // update the state on window resize
  const onResizeHandler = () => {
    const isMobile = window.innerWidth <= 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 990
    const isDesktop = window.innerWidth > 990

    setState({ isMobile, isTablet, isDesktop, width: window.innerWidth, height: window.innerHeight })
  }

  // debounce the resize call
  const debouncedCall = debounce(onResizeHandler, 500)

  useEffect(() => {
    // update the state on the initial load
    if (window && typeof window != 'undefined') {
      onResizeHandler()

      // assign the event
      window.addEventListener('resize', debouncedCall, false)
    }

    return () => {
      // remove the event
      window.removeEventListener('resize', debouncedCall, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}

export default useResponsive
