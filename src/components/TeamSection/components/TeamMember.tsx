import type { TeamMember as TeamMemberType } from '@/types/TeamMember'
import { resolveTeamMemberImg } from '../utils'
import { useTranslation } from 'react-i18next'
import { pick, useLang } from '@/hooks/useLang'

import { Card } from 'primereact/card'
import { Tag } from 'primereact/tag'
import { classNames } from 'primereact/utils'
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

  const hasSocials = !!member.links?.linkedin || !!member.links?.github

  return (
    <Card
      className={classNames(
        'text-center border-round-2xl shadow-2 surface-card overflow-hidden',
        'hover:shadow-4 transition-all transition-duration-200 flex flex-column justify-content-start p-0 w-20rem',
      )}
      style={{
        maxWidth: '240px',
        margin: '0',
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '1',
        }}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={member.name}
            className="absolute top-0 left-0 w-full h-full border-round border-2 border-gray-300"
            style={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
          />
        ) : (
          <div
            className="flex align-items-center justify-content-center w-full bg-primary text-white absolute top-0 left-0 select-none border-round border-2 border-gray-300"
            style={{
              height: '100%',
              fontSize: '2.5rem',
              fontWeight: 600,
            }}
          >
            {member.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex flex-column align-items-center px-2 pt-1">
        <div className="flex flex-column align-items-center justify-content-center text-center h-4rem">
          <span className="font-semibold text-base mb-1 py-1">{member.name}</span>
        </div>
        {roleText && (
          <Tag
            value={roleText}
            rounded
            className="mb-2 emognition-gradient-right w-9 select-none"
            pt={{ root: { className: 'text-xs' } }}
          />
        )}

        {hasSocials && (
          <>
            <hr className="w-8 border-t-2 border-gray-200 my-2" />
            <div className="flex gap-2 justify-content-center mt-1">
              {member.links?.linkedin && (
                <SocialLink
                  href={member.links.linkedin}
                  icon="pi pi-linkedin"
                  label={t('socials.linkedin')}
                  colorClass="p-button-info p-button-sm"
                />
              )}
              {member.links?.github && (
                <SocialLink
                  href={member.links.github}
                  icon="pi pi-github"
                  label="GitHub"
                  colorClass="p-button-secondary p-button-sm"
                />
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  )
})

export default TeamMember
