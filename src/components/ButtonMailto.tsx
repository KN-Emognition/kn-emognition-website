// src/components/ButtonMailto.tsx
import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonMailtoProps {
  mailto: string
  label: ReactNode
  className?: string
}

const ButtonMailto = ({ mailto, label, className }: ButtonMailtoProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = mailto
  }

  return (
    <Link to="#" onClick={handleClick} className={className}>
      {label}
    </Link>
  )
}

export default ButtonMailto
