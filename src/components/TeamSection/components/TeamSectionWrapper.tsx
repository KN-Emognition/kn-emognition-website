import type { PropsWithChildren } from 'react'

const TeamSectionWrapper = ({ children }: PropsWithChildren) => {
  // container with responsive padding
  return (
    <div className="container mx-auto px-3 md:px-4 lg:px-5 flex flex-column align-items-center justify-content-center w-full">
      {children}
    </div>
  )
}

export default TeamSectionWrapper
