import hauthImage from '@/assets/img/projects/heartauth/hauth-2.png'
import EcgMonitor from '@/components/EcgMonitor'
import ProjectDetail from './ProjectDetail'

const HeartAuthPage = () => (
  <ProjectDetail projectKey="heartauth" image={hauthImage} extra={<EcgMonitor />} />
)

export default HeartAuthPage
