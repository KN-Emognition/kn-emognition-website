export type TeamMember = {
  id: number
  name: string
  role: {
    pl: string
    en: string
  }
  photoUrl?: string
  links?: TeamMemberLinks
}

type TeamMemberLinks = {
  linkedin?: string
  github?: string
}
