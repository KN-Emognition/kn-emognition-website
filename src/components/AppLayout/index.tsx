import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'
import { Dropdown, type DropdownChangeEvent, type DropdownProps } from 'primereact/dropdown'
import { Menubar } from 'primereact/menubar'
import { useState } from 'react'
import type { MenuItem } from 'primereact/menuitem'

const AppLayout = () => {
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
            src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
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
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`mr-2 flag flag-${option.flag_code.toLowerCase()}`}
          style={{ width: '18px' }}
        />
        <div>{option.label}</div>
      </div>
    )
  }

  const itemRenderer = (item: MenuItem) => (
    <NavLink to={item.url ?? '#'} className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{t(item.label ?? '')}</span>
    </NavLink>
  )

  const items: MenuItem[] = [
    {
      label: 'navigation.home',
      icon: 'pi pi-home',
      template: itemRenderer,
      url: '/',
    },
    {
      label: 'navigation.team',
      icon: 'pi pi-users',
      template: itemRenderer,
      url: '/zespol',
    },
    {
      label: 'navigation.projects',
      icon: 'pi pi-search',
      template: itemRenderer,
      items: [
        {
          label: 'HeartAuth',
          template: itemRenderer,
        },
      ],
    },
    {
      label: 'navigation.recruitment',
      icon: 'pi pi-pen-to-square',
      template: itemRenderer,
      url: '/rekrutacja',
    },
    {
      label: 'navigation.contact',
      icon: 'pi pi-envelope',
      template: itemRenderer,
      url: '/kontakt',
    },
  ]

  const start = <img alt="logo" src="logo-wide.svg" height="50" className="mr-2"></img>
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
        className="md:w-14rem"
      />
    </div>
  )

  return (
    <div>
      <header>
        <div className="card">
          <Menubar model={items} start={start} end={end} />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
