const SocialLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
    <i className={icon} aria-hidden="true" />
  </a>
)

export default SocialLink
