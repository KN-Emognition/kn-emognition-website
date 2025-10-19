import { useNavigate } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import type { MenuItem } from 'primereact/menuitem'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownChangeEvent, type DropdownProps } from 'primereact/dropdown'
import { Menubar } from 'primereact/menubar'
import { useState } from 'react'
import logoWide from '@/assets/img/logo-wide.svg'
export default function Navbar() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language
  const languages = [
    { flag_code: 'pl', code: 'pl', label: 'Polski' },
    { flag_code: 'gb', code: 'en', label: 'English' },
  ]
  const [selectedCountry, setSelectedCountry] = useState(
    languages.find((lang) => lang.code === currentLanguage) || languages[0],
  )

  const handleCountryChange = (e: DropdownChangeEvent) => {
    setSelectedCountry(e.value)
    i18n.changeLanguage(e.value.code).then(() => {})
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
            src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" // TODO use local asset
            className={`mr-2 flag flag-${option.flag_code.toLowerCase()}`}
            style={{ width: '18px' }}
          />
          <div>{option.label}</div>
        </div>
      )
    }

    return <span>{props.placeholder}</span>
  }

  const countryOptionTemplate = (option: { label: string; code: string; flag_code: string }) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.label}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" // TODO use local asset
          className={`mr-2 flag flag-${option.flag_code.toLowerCase()}`}
          style={{ width: '18px' }}
        />
        <div>{option.label}</div>
      </div>
    )
  }

  const itemRenderer = (item: MenuItem) =>
    item.url ? (
      <ScrollLink
        key={item.url}
        to={item!.url}
        smooth={true}
        duration={600}
        offset={-70}
        onClick={() => handleNavClick(item!.url as string)}
        className="flex align-items-center p-menuitem-link bg-gray-100 mx-1 border-1 border-round border-gray-300 hover:border-blue-500 hover:shadow-0 transition-all transition-ease-in-out transition-duration-300"
      >
        <span className={item.icon} />
        <span className="mx-2">{t(item.label ?? '')}</span>
      </ScrollLink>
    ) : (
      <div className="flex align-items-center p-menuitem-link bg-gray-100 mx-1 border-1 border-round border-gray-300 hover:border-blue-500 transition-all transition-ease-in-out transition-duration-300">
        <span className={item.icon} />
        <span className="mx-2">{t(item.label ?? '')}</span>
      </div>
    )

  const items: MenuItem[] = [
    {
      label: 'navigation.home',
      icon: 'pi pi-home',
      template: itemRenderer,
      url: 'home',
    },
    {
      label: 'navigation.about',
      icon: 'pi pi-info-circle',
      template: itemRenderer,
      url: 'about',
    },
    {
      label: 'navigation.team',
      icon: 'pi pi-users',
      template: itemRenderer,
      url: 'team',
    },
    {
      label: 'navigation.recruitment',
      icon: 'pi pi-pen-to-square',
      template: itemRenderer,
      url: 'recruitment',
    },
    // {
    //   label: 'navigation.contact',
    //   icon: 'pi pi-envelope',
    //   template: itemRenderer,
    //   url: 'contact',
    // },
    {
      label: 'navigation.projects',
      icon: 'pi pi-search',
      template: itemRenderer,
      items: [
        {
          label: 'HeartAuth',
          template: itemRenderer,
          url: 'projects/heartauth',
        },
      ],
    },
  ]

  const start = <img alt="logo" src={logoWide} height="50" className="mr-4"></img>
  const end = (
    <div className="flex align-items-center gap-2">
      <Dropdown
        value={selectedCountry}
        onChange={handleCountryChange}
        options={languages}
        optionLabel="name"
        placeholder="Select a Country"
        valueTemplate={selectedCountryTemplate}
        itemTemplate={countryOptionTemplate}
        className="md:w-14rem bg-gray-100"
      />
    </div>
  )

  const handleNavClick = (section: string) => {
    navigate(section === 'home' ? '/' : `/${section}`)
  }

  return (
    <nav className="fixed top-0 left-0 w-full shadow flex justify-center z-5">
      <Menubar model={items} start={start} end={end} className="w-full bg-gray-50" />
    </nav>
  )
}
