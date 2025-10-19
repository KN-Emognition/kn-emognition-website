import TeamMember from './components/TeamMember'
import TeamSectionWrapper from './components/TeamSectionWrapper'
import teamManifests from '@/assets/team/manifest.json'

// If your manifest items don't already match TeamMemberType exactly,
// ensure they do or cast carefully.
const TeamSection = () => {
  return (
    <TeamSectionWrapper>
      <div className="grid -m-2 md:-m-3 w-full justify-content-center">
        {teamManifests.map((member) => (
          <div
            key={member.id}
            className="col-12 sm:col-6 lg:col-2 md:col-4 p-2 m-3 md:p-3 flex flex-column align-items-center justify-content-center scale-on-hover"
          >
            <TeamMember member={member} />
          </div>
        ))}
      </div>
    </TeamSectionWrapper>
  )
}

export default TeamSection
