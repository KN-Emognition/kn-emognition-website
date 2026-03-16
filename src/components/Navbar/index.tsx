import { useNavigate, useLocation } from 'react-router-dom' //
import { Link as ScrollLink } from 'react-scroll' //
import type { MenuItem } from 'primereact/menuitem' //
import { useTranslation } from 'react-i18next' //
import { Dropdown, type DropdownChangeEvent, type DropdownProps } from 'primereact/dropdown' //
import { Menubar } from 'primereact/menubar' //
import { useState } from 'react' //
import logoWide from '@/assets/img/logo-wide.svg' //

export default function Navbar() {
  const navigate = useNavigate() //
  const location = useLocation() //
  const { t, i18n } = useTranslation() //
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language //

  const languages = [
    { flag_code: 'pl', code: 'pl', label: 'Polski' },
    { flag_code: 'gb', code: 'en', label: 'English' },
  ] //

  const [selectedCountry, setSelectedCountry] = useState(
    languages.find((lang) => lang.code === currentLanguage) || languages[0],
  ) //

  const handleNavClick = (section: string) => {
    navigate(section === 'home' ? '/' : `/${section}`) //
  }

  const handleCountryChange = (e: DropdownChangeEvent) => {
    setSelectedCountry(e.value) //
    i18n.changeLanguage(e.value.code).then(() => {}) //
  }

  const selectedCountryTemplate = (
    option: { label: string; code: string; flag_code: string },
    props: DropdownProps,
  ) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.label}
            src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
            className={`mr-2 flag flag-${option.flag_code.toLowerCase()}`}
            style={{ width: '18px' }}
          />
          <div>{option.label}</div>
        </div>
      )
    }
    return <span>{props.placeholder}</span>
  } //

  const countryOptionTemplate = (option: { label: string; code: string; flag_code: string }) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.label}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`mr-2 flag flag-${option.flag_code.toLowerCase()}`}
          style={{ width: '18px' }}
        />
        <div>{option.label}</div>
      </div>
    )
  } //

  const itemRenderer = (item: MenuItem) =>
    item.url ? (
      <ScrollLink
        key={item.url}
        to={item!.url}
        smooth={true}
        duration={600}
        offset={-70}
        onClick={() => handleNavClick(item!.url as string)}
        className="flex align-items-center p-menuitem-link bg-white-alpha-10 text-white mx-1 border-1 border-round border-white-alpha-30 hover:border-blue-500"
      >
        <span className={item.icon} />
        <span className="ml-2">{t(item.label ?? '')}</span>
      </ScrollLink>
    ) : (
      <div className="flex align-items-center p-menuitem-link bg-white-alpha-10 text-white mx-1 border-1 border-round border-white-alpha-30 hover:border-blue-500 transition-all transition-ease-in-out transition-duration-300">
        <span className={item.icon} />
        <span className="ml-2">{t(item.label ?? '')}</span>
      </div>
    ) //

  const items: MenuItem[] = [
    { label: 'navigation.about', icon: 'pi pi-info-circle', template: itemRenderer, url: 'about' },
    { label: 'navigation.team', icon: 'pi pi-users', template: itemRenderer, url: 'team' },
    {
      label: 'navigation.recruitment',
      icon: 'pi pi-pen-to-square',
      template: itemRenderer,
      url: 'recruitment',
    },
    { label: 'navigation.contact', icon: 'pi pi-envelope', template: itemRenderer, url: 'contact' },
    {
      label: 'navigation.projects',
      icon: 'pi pi-search',
      template: itemRenderer,
      items: [
        {
          label: 'pages.projects.heartauth.title',
          template: itemRenderer,
          url: 'projects/heartauth',
        },
        {
          label: 'pages.projects.resqvoice.title',
          template: itemRenderer,
          url: 'projects/resqvoice',
        },
        {
          label: 'pages.projects.psychotherapy.title',
          template: itemRenderer,
          url: 'projects/psychotherapy',
        },
      ],
    },
  ] //

  const start = (
    <ScrollLink
      key="home"
      to="home"
      smooth={true}
      duration={600}
      offset={-70}
      onClick={() => handleNavClick('home')}
      className="flex align-items-center justify-content-center cursor-pointer mr-4"
    >
      <img alt="logo" src={logoWide} height="50" className="bg-white-alpha-50 border-round p-1" />
    </ScrollLink>
  ) //

  const end = (
    <div className="flex align-items-center gap-2 text-white">
      <Dropdown
        value={selectedCountry}
        onChange={handleCountryChange}
        options={languages}
        optionLabel="name"
        placeholder="Select a Country"
        valueTemplate={selectedCountryTemplate}
        itemTemplate={countryOptionTemplate}
        className="text-white md:w-14rem bg-white-alpha-10 border-white-alpha-30 hover:border-blue-500"
      />
    </div>
  ) //

  return (
    <nav
      className="fixed top-0 left-0 w-full shadow flex justify-center bg-transparent"
      style={{ zIndex: 1000 }}
    >
      <Menubar
        key={location.pathname}
        model={items}
        start={start}
        end={end}
        className="w-full glass bg-black-alpha-20"
      />
    </nav>
  )
}
