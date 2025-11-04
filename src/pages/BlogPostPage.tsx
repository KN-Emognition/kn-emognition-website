import { pick, useLang } from '@/hooks/useLang'
import { useParams, Navigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import {
  resolvePostImage,
  resolvePost,
  formatCreatedAt,
  replacePostImageTags,
} from '@/components/Blog/utils.ts'
import { Card } from 'primereact/card'
import { Tag } from 'primereact/tag'

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>()
  const lang = useLang()
  const post = postId ? resolvePost(postId) : null // Assume this function gets the current post based on URL or context

  if (!post || !postId) {
    return <Navigate to="/notfound" replace />
  }

  const createdAt = formatCreatedAt(post.created_at, lang, true)
  const sanitizedBody = replacePostImageTags(DOMPurify.sanitize(pick(post.body, lang)), postId)

  return (
    <section className="w-screen page navbar-padding flex flex-column justify-content-start align-items-center pb-4">
      <div className="w-full h-14rem flex flex-column align-items-center justify-content-center text-center">
        <h1>{pick(post.title, lang)}</h1>
      </div>
      <Card className="w-11 lg:w-10 bg-black-alpha-40 text-white flex flex-column justify-content-center align-items-center pb-5">
        <div className="w-full flex flex-column justify-content-start align-items-center gap-3">
          {post.title_image ? (
            <img
              src={resolvePostImage(postId, post.title_image)}
              alt={pick(post.title, lang)}
              className="mb-4 border-round shadow-2 w-11 lg:w-6"
            />
          ) : null}
          <div className="w-11 lg:w-6 flex flex-column justify-content-start align-items-center gap-5">
            <div className="w-full flex flex-row justify-content-end">
              <Tag value={createdAt} />
            </div>
            <h2 className="lg:text-3xl">{pick(post.title, lang)}</h2>
            <h3
              className="flex flex-column justify-content-start align-items-center gap-5"
              dangerouslySetInnerHTML={{ __html: sanitizedBody }}
            />
          </div>
        </div>
      </Card>
    </section>
  )
}

export default BlogPostPage
