const manifestsEager = import.meta.glob('/src/assets/posts/*/manifest.json', {
  eager: true,
}) as Record<string, PostManifest>
const imagesEager = import.meta.glob('/src/assets/posts/*/img/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export type PostManifest = {
  title: {
    en: string
    pl: string
  }
  title_image: string | null
  created_at: number
  body: {
    en: string
    pl: string
  }
}

export function resolvePosts(): Array<{ id: string; manifest: PostManifest }> {
  const posts = Object.entries(manifestsEager).map(([key, raw]) => {
    // match folder name (UUID) from path like .../posts/{uuid}/manifest.json
    const match =
      key.match(/\/posts\/([^/]+)\/manifest\.json$/) || key.match(/posts\/([^/]+)\/manifest\.json$/)
    if (!match) {
      throw new Error(`Unable to extract post id from path: ${key}`)
    }
    const id = match[1]
    const manifest: PostManifest = raw

    return { id, manifest }
  })

  posts.sort((a, b) => {
    const aTs = Number(a.manifest?.created_at ?? 0) || 0
    const bTs = Number(b.manifest?.created_at ?? 0) || 0
    return bTs - aTs
  })

  return posts
}

export function resolvePost(uuid: string) {
  const key = Object.keys(manifestsEager).find((k) =>
    k.endsWith(`/assets/posts/${uuid}/manifest.json`),
  )
  return key ? manifestsEager[key] : undefined
}

export function resolvePostImage(uuid: string, imageName: string): string | undefined {
  const matchSuffix = `/posts/${uuid}/img/${imageName}`
  const key = Object.keys(imagesEager).find(
    (k) => k.endsWith(matchSuffix) || k.includes(matchSuffix),
  )
  return key ? imagesEager[key] : undefined
}

export function chunkArray<T>(arr: T[], size: number): T[][] {
  if (!Array.isArray(arr) || size <= 0) return []
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export function formatCreatedAt(
  epoch: number | string,
  locale?: string,
  includeTime = true,
): string {
  const num = typeof epoch === 'string' ? Number(epoch) : epoch
  if (Number.isNaN(num) || num == null) return ''
  // treat 10-digit-ish values as seconds
  const ms = num < 1e12 ? num * 1000 : num
  const d = new Date(ms)
  if (Number.isNaN(d.getTime())) return ''
  const options: Intl.DateTimeFormatOptions = includeTime
    ? { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { year: 'numeric', month: 'short', day: 'numeric' }
  return d.toLocaleString(locale || undefined, options)
}

export function previewText(
  input: unknown,
  photo_alt: string,
  maxChars = 300,
  suffix = '…',
): string {
  if (input == null) return ''
  const str = String(input)
    // replace image tags with the photo_alt placeholder
    .replace(/<img\b[^>]*>/gi, photo_alt)
    // remove any other HTML tags
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (str.length <= maxChars) return str
  const truncated = str.slice(0, maxChars)
  const lastSpace = truncated.lastIndexOf(' ')
  const result = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated
  return result + suffix
}

export function replacePostImageTags(input: string, uuid: string): string {
  if (!input) return input
  const env = typeof window !== 'undefined' ? 'browser' : 'server'
  console.log(`[replacePostImageTags] env=${env} uuid=${uuid} inputLen=${input.length}`)

  // Updated regex: match src="..." or src='...', with optional ./img/, img/, or no folder prefix
  const regex =
    /<img\b[^>]*\bsrc\s*=\s*(?:(['"])(?:\.\/)?(?:img\/)?([^'"]+)\1|(?:\.\/)?(?:img\/)?([^\s>"']+))[^>]*>/gi

  const str = input.replace(regex, (match, _quote, imgQuoted, imgUnquoted) => {
    const imgName = imgQuoted || imgUnquoted
    if (!imgName) return match
    console.log(`[replacePostImageTags] resolving image for post ${uuid}, image name: ${imgName}`)
    const resolved = resolvePostImage(uuid, imgName)
    if (resolved) {
      return `<img src="${resolved}" class='border-round shadow-2 w-full' alt="post image"/>`
    }
    return match
  })

  console.log(`[replacePostImageTags] resultLen=${str.length}`)
  return str
}
