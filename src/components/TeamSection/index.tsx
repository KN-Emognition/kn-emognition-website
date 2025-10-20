import TeamMember from './components/TeamMember'
import type { TeamMember as TeamMemberType } from '@/types/TeamMember'
import TeamSectionWrapper from './components/TeamSectionWrapper'
import teamManifests from '@/assets/team/manifest.json'
import { pick, useLang } from '@/hooks/useLang'

// If your manifest items don't already match TeamMemberType exactly,
// ensure they do or cast carefully.
const TeamSection: React.FC = () => {
  const lang = useLang()

  return (
    <TeamSectionWrapper>
      <div className="flex-column w-full">
        {teamManifests.sections.map((section) => (
          <div
            key={pick(section.section_name, lang)}
            className="w-full flex-column justify-content-center align-items-center text-center"
          >
            <h3 className="pt-3 font-semibold">{pick(section.section_name, lang).toUpperCase()}</h3>
            <div className="grid -m-2 md:-m-3 justify-content-center align-items-center">
              {section.members.map((member: TeamMemberType) => (
                <div
                  key={member.id}
                  className="col-12 sm:col-6 lg:col-2 md:col-4 p-2 m-3 md:p-3 flex flex-column align-items-center justify-content-center scale-on-hover"
                >
                  <TeamMember member={member} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TeamSectionWrapper>
  )
}

export default TeamSection
