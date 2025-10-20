import { useTranslation } from 'react-i18next'
import ButtonMailto from '@/components/ButtonMailto.tsx'

const ContactPage = () => {
  const { t } = useTranslation()

  return (
    <section className="hero-recruitment h-screen flex flex-column justify-content-center align-items-center bg-blue-100 w-screen">
      <div className="content flex-column align-items-center justify-content-center text-center">
        <h1 className="text-xl lg:text-5xl">{t('pages.contact.heading')}</h1>
        <h2 className="text-sm lg:text-xl page-lead font-normal py-5 text-justify">
          {t('pages.contact.lead')}
        </h2>
        <ButtonMailto
          mailto="mailto:kn.emognition@pwr.edu.pl"
          label="kn.emognition@pwr.edu.pl"
          className="font-bold text-2xl lg:text-4xl text-white"
        />
      </div>
    </section>
  )
}

export default ContactPage
