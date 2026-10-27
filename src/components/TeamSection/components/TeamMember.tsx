import type { TeamMember as TeamMemberType } from '@/types/TeamMember'
import { resolveTeamMemberImg } from '../utils'
import { useTranslation } from 'react-i18next'
import { pick, useLang } from '@/hooks/useLang'
import { memo, useMemo } from 'react'
import SocialLink from './SocialLink'

interface Props {
  member: TeamMemberType
}

const TeamMember = memo(({ member }: Props) => {
  const lang = useLang()
  const { t } = useTranslation()

  const roleText = member.role ? pick(member.role, lang) : null
  const imgSrc = useMemo(
    () => (member.photoUrl ? resolveTeamMemberImg(member.photoUrl) : undefined),
    [member.photoUrl],
  )
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <article className="card card--interactive member reveal">
      <div className="member__photo">
        {imgSrc ? (
          <img src={imgSrc} alt={member.name} loading="lazy" decoding="async" />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </div>
      <div className="member__body">
        <h4 className="member__name">{member.name}</h4>
        {roleText && <span className="member__role">{roleText}</span>}
        <div className="member__links">
          {member.links?.linkedin && (
            <SocialLink
              href={member.links.linkedin}
              icon="pi pi-linkedin"
              label={`${member.name} – ${t('socials.linkedin')}`}
            />
          )}
          {member.links?.github && (
            <SocialLink
              href={member.links.github}
              icon="pi pi-github"
              label={`${member.name} – ${t('socials.github')}`}
            />
          )}
        </div>
      </div>
    </article>
  )
})

export default TeamMember
