import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { pick, useLang } from '@/hooks/useLang'
import {
  resolvePostImage,
  resolvePosts,
  formatCreatedAt,
  previewText,
} from '@/components/Blog/utils.ts'

const BlogPage = () => {
  const lang = useLang()
  const { t } = useTranslation()
  const posts = resolvePosts()

  return (
    <section className="section page-top">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t('navigation.blog')}</span>
          <h1>{t('pages.blog.heading')}</h1>
          <p className="lead">{t('pages.blog.lead')}</p>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <i className="pi pi-inbox" aria-hidden="true" />
            <p>{t('pages.blog.empty')}</p>
          </div>
        ) : (
          <div className="post-grid">
            {posts.map(({ id, manifest }) => {
              const cover = manifest.title_image ? resolvePostImage(id, manifest.title_image) : null
              const title = pick(manifest.title, lang)
              return (
                <Link
                  key={id}
                  to={`/blog/${id}`}
                  className="card card--interactive post-card reveal"
                >
                  <div className="post-card__cover">
                    {cover && <img src={cover} alt="" loading="lazy" />}
                  </div>
                  <div className="post-card__body">
                    <span className="tag" style={{ alignSelf: 'flex-start' }}>
                      {formatCreatedAt(manifest.created_at, lang, false)}
                    </span>
                    <h3>{title}</h3>
                    <p>{previewText(pick(manifest.body, lang), t('pages.blog.photo_alt'), 180)}</p>
                    <span className="post-card__more">
                      {t('pages.blog.button')}{' '}
                      <i className="pi pi-arrow-right" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogPage
