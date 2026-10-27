import TeamMember from './components/TeamMember'
import type { TeamMember as TeamMemberType } from '@/types/TeamMember'
import teamManifests from '@/assets/team/manifest.json'
import { pick, useLang } from '@/hooks/useLang'

const TeamSection = () => {
  const lang = useLang()

  return (
    <>
      {teamManifests.sections.map((section) => (
        <div key={section.section_name.en} className="team-section">
          <h3 className="team-section__title">{pick(section.section_name, lang)}</h3>
          <div className="team-grid">
            {section.members.map((member: TeamMemberType) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default TeamSection
