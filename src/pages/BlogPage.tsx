import { useTranslation } from 'react-i18next'
import { pick, useLang } from '@/hooks/useLang'
import {
  type PostManifest,
  resolvePostImage,
  resolvePosts,
  chunkArray,
  formatCreatedAt,
  previewText,
} from '@/components/Blog/utils.ts'
import { Galleria } from 'primereact/galleria'
import { Card } from 'primereact/card'
import { Tag } from 'primereact/tag'
import { Link } from 'react-router-dom'

const BlogPage = () => {
  const lang = useLang()
  const { t } = useTranslation()

  const postsRaw = resolvePosts()
  const postsChunks = chunkArray(postsRaw, 5)

  const postTemplate = (post: { id: string; manifest: PostManifest }) => {
    const createdAt = formatCreatedAt(post.manifest.created_at, lang, false)

    return (
      <Card
        id={post.id}
        className="w-11 lg:w-7 bg-black-alpha-30 text-white flex flex-column justify-content-center align-items-center text-center"
      >
        {post.manifest.title_image ? (
          <img
            src={resolvePostImage(post.id, post.manifest.title_image)}
            alt={pick(post.manifest.title, lang)}
            className="mb-4 border-round shadow-2 w-11"
          />
        ) : null}
        <div className="w-full flex flex-column justify-content-center align-items-center">
          <div className="w-11">
            <div className="flex flex-row justify-content-start">
              <Tag value={createdAt} />
            </div>
            <h1 className="text-2xl lg:text-3xl">{pick(post.manifest.title, lang)}</h1>
            <p className="text-justify">
              {previewText(pick(post.manifest.body, lang), t('pages.blog.photo_alt'))}
            </p>
            <div className="flex flex-row justify-content-end mt-5">
              <Link
                to={`/blog/${post.id}`}
                className="p-button p-button-sm bg-white-alpha-10 border-white-alpha-30 scale-on-hover flex-row gap-2 no-underline"
              >
                <div>{t('pages.blog.button')}</div>
                <i className="pi pi-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const postListTemplate = (postList: { id: string; manifest: PostManifest }[]) => {
    return (
      <div className="flex flex-column justify-content-center align-items-center gap-5 text-center">
        {postList.map(postTemplate)}
      </div>
    )
  }

  return (
    <section className="w-screen page navbar-padding flex flex-column justify-content-center align-items-center pt-8 pb-5">
      <div className="text-center py-6 px-3 lg:px-0">
        <h1 className="pb-2">{t('pages.blog.heading')}</h1>
        <h3>{t('pages.blog.lead')}</h3>
      </div>
      <Galleria
        value={postsChunks}
        showThumbnails={false}
        showIndicators={true}
        item={postListTemplate}
      />
    </section>
  )
}

export default BlogPage
