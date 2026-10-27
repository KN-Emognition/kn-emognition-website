import { pick, useLang } from '@/hooks/useLang'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DOMPurify from 'dompurify'
import {
  resolvePostImage,
  resolvePost,
  formatCreatedAt,
  replacePostImageTags,
} from '@/components/Blog/utils.ts'

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>()
  const lang = useLang()
  const { t } = useTranslation()
  const post = postId ? resolvePost(postId) : null

  if (!post || !postId) {
    return <Navigate to="/notfound" replace />
  }

  const sanitizedBody = replacePostImageTags(DOMPurify.sanitize(pick(post.body, lang)), postId)
  const cover = post.title_image ? resolvePostImage(postId, post.title_image) : null

  return (
    <article className="section page-top">
      <div className="container">
        <div className="article">
          <Link to="/blog" className="back-link">
            <i className="pi pi-arrow-left" aria-hidden="true" />
            {t('pages.blog.back')}
          </Link>
          <div className="article__meta">
            <span className="tag">{formatCreatedAt(post.created_at, lang, true)}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>{pick(post.title, lang)}</h1>
          {cover && <img className="article__cover" src={cover} alt={pick(post.title, lang)} />}
          <div className="article__body" dangerouslySetInnerHTML={{ __html: sanitizedBody }} />
        </div>
      </div>
    </article>
  )
}

export default BlogPostPage
