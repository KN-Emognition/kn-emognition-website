import { classNames } from 'primereact/utils'

const SocialLink = ({
  href,
  icon,
  label,
  colorClass,
}: {
  href: string
  icon: string
  label: string
  colorClass?: string
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={classNames(
      'p-button p-component p-button-outlined flex align-items-center gap-2 h-2rem w-2rem p-0 justify-content-center glass glass-link bg-black-alpha-20',
      colorClass,
    )}
    aria-label={label}
  >
    <span className={classNames('p-button-icon', icon)} aria-hidden="true" />
  </a>
)
export default SocialLink
