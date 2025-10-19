// src/hooks/useNavbarHeight.ts
import { useEffect } from 'react'

export function useNavbarHeight(navSelector = '#site-navbar') {
  useEffect(() => {
    const nav = document.querySelector(navSelector) as HTMLElement | null
    if (!nav) return

    const setVar = () =>
      document.documentElement.style.setProperty('--navbar-height', `${nav.offsetHeight}px`)

    setVar()

    const ro = new ResizeObserver(setVar)
    ro.observe(nav)

    window.addEventListener('resize', setVar)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', setVar)
    }
  }, [navSelector])
}
