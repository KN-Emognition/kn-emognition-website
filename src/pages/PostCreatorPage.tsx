// src/pages/PostCreatorPage.tsx
import React, { useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import JSZip from 'jszip'
import { Card } from 'primereact/card'
import { Tag } from 'primereact/tag'
import { formatCreatedAt } from '@/components/Blog/utils.ts'

// Change Block to support paragraphs with two languages
type ParagraphContent = { en: string; pl: string }
type Block = { type: 'p'; content: ParagraphContent } | { type: 'img'; content: string }

// BlogEditor.tsx
// - Single-file React component editor for creating blog posts
// - Uses Tailwind classes for styling (no Tailwind imports here)
// - Allows adding paragraphs and images (the only allowed HTML tags in body are <p> and <img>)
// - Shows a live preview
// - Lets user download a ZIP containing a single post folder: {uuid}/manifest.json and {uuid}/img/*

const PostCreatorPage = () => {
  // manifest fields
  const [titleEn, setTitleEn] = useState('')
  const [titlePl, setTitlePl] = useState('')
  // use a Date so the Calendar component receives and returns a Date instance
  const [datetime24h, setDateTime24h] = useState<Date | null>(new Date())

  // blocks: for p it's {en,pl}, for img it's filename reference
  const [blocks, setBlocks] = useState<Block[]>([])

  // inline editing state for paragraph blocks (index + content)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState<ParagraphContent>({ en: '', pl: '' })

  // keep uploaded images as { file: File, filename: string }
  const [images, setImages] = useState<Array<{ file: File; filename: string }>>([])

  // title image choice (filename or null)
  const [titleImageFilename, setTitleImageFilename] = useState<string | null>(null)

  // two refs for EN and PL paragraph inputs
  const paragraphEnRef = useRef<HTMLTextAreaElement | null>(null)
  const paragraphPlRef = useRef<HTMLTextAreaElement | null>(null)

  // preview language: 'en' or 'pl'
  const [previewLang, setPreviewLang] = useState<'en' | 'pl'>('pl')

  // helper: create a safe unique filename for images to avoid collisions
  function makeUniqueFilename(original: string) {
    // keep extension
    const dot = original.lastIndexOf('.')
    const name = dot >= 0 ? original.slice(0, dot) : original
    const ext = dot >= 0 ? original.slice(dot) : ''
    // short uuid
    const uid = crypto?.randomUUID?.().split('-')[0] ?? Date.now().toString(36)
    return `${name}-${uid}${ext}`
  }

  function addParagraph() {
    const en = paragraphEnRef.current?.value ?? ''
    const pl = paragraphPlRef.current?.value ?? ''
    if (!en.trim() && !pl.trim()) return
    setBlocks((b) => [...b, { type: 'p', content: { en: en.trim(), pl: pl.trim() } }])
    if (paragraphEnRef.current) paragraphEnRef.current.value = ''
    if (paragraphPlRef.current) paragraphPlRef.current.value = ''
  }

  function onImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    const newImages: typeof images = []
    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      const unique = makeUniqueFilename(f.name)
      newImages.push({ file: f, filename: unique })
    }
    setImages((arr) => [...arr, ...newImages])
    // reset input
    e.currentTarget.value = ''
  }

  function moveBlock(index: number, dir: -1 | 1) {
    setBlocks((arr) => {
      const copy = [...arr]
      const j = index + dir
      if (j < 0 || j >= copy.length) return arr
      const tmp = copy[j]
      copy[j] = copy[index]
      copy[index] = tmp
      return copy
    })
  }

  function removeBlock(index: number) {
    setBlocks((arr) => arr.filter((_, i) => i !== index))
    // if currently editing that block, cancel editor
    setEditingIndex((cur) => (cur === index ? null : cur))
    setEditingContent({ en: '', pl: '' })
  }

  function removeImage(filename: string) {
    // remove any image blocks referencing it and the file from images list
    setBlocks((arr) => arr.filter((b) => !(b.type === 'img' && b.content === filename)))
    setImages((arr) => arr.filter((im) => im.filename !== filename))
    if (titleImageFilename === filename) setTitleImageFilename(null)
  }

  function addImageBlock(filename: string) {
    setBlocks((arr) => [...arr, { type: 'img', content: filename }])
  }

  function renderBlockPreview(block: Block, idx: number) {
    if (block.type === 'p') {
      // editing UI
      if (editingIndex === idx) {
        return (
          <div key={idx} className="w-full bg-white-alpha-10 p-3 rounded">
            <div className="mb-2 text-xs text-slate-400">Editing paragraph</div>
            <div className="mb-2">
              <div className="mb-1 text-xs text-slate-400">English</div>
              <textarea
                className="w-full p-2 rounded bg-black-alpha-10 text-white"
                value={editingContent.en}
                onChange={(e) => setEditingContent((c) => ({ ...c, en: e.target.value }))}
                rows={4}
              />
            </div>
            <div className="mb-2">
              <div className="mb-1 text-xs text-slate-400">Polish</div>
              <textarea
                className="w-full p-2 rounded bg-black-alpha-10 text-white"
                value={editingContent.pl}
                onChange={(e) => setEditingContent((c) => ({ ...c, pl: e.target.value }))}
                rows={4}
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={() => {
                  setBlocks((prev) =>
                    prev.map((b, i) => {
                      // Only update content when this block is a paragraph. This avoids
                      // assigning a ParagraphContent to an image block's string content.
                      if (i === idx && b.type === 'p') {
                        return { ...b, content: editingContent }
                      }
                      return b
                    }),
                  )
                  setEditingIndex(null)
                  setEditingContent({ en: '', pl: '' })
                }}
                className="px-3 py-2 bg-green-700 border-white-alpha-30 scale-on-hover"
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setEditingIndex(null)
                  setEditingContent({ en: '', pl: '' })
                }}
                className="px-3 py-2 bg-white-alpha-10 border-white-alpha-30 scale-on-hover"
              >
                Cancel
              </Button>
            </div>
          </div>
        )
      }

      const rawEn = String(block.content.en ?? '')
      const rawPl = String(block.content.pl ?? '')
      const MAX = 200

      function truncate(raw: string) {
        let truncated = raw
        if (raw.length > MAX) {
          truncated = raw.slice(0, MAX).trimEnd()
          const lastSpace = truncated.lastIndexOf(' ')
          if (lastSpace > Math.floor(MAX * 0.6)) {
            truncated = truncated.slice(0, lastSpace)
          }
          truncated = truncated + '…'
        }
        return truncated
      }

      function escapeForHtml(s: string) {
        return s
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('\n', '<br/>')
      }

      const textEn = escapeForHtml(truncate(rawEn))
      const textPl = escapeForHtml(truncate(rawPl))

      const combinedHtml = `<p>${textEn}</p>${textPl ? `<p class="text-sm italic opacity-70">${textPl}</p>` : ''}`

      return (
        <div key={idx} className="w-full bg-white-alpha-10 px-3 pt-3 pb-6 rounded relative">
          <div className="mb-2 text-xs text-slate-400">Paragraph</div>
          <div
            className="text-left prose max-w-none"
            dangerouslySetInnerHTML={{ __html: combinedHtml }}
          />
          <div className="absolute top-2 right-2">
            <Button
              onClick={() => {
                setEditingIndex(idx)
                if (block.type === 'p') setEditingContent({ ...block.content })
              }}
              className="px-2 py-1 rounded border"
            >
              Edit
            </Button>
          </div>
        </div>
      )
    }
    if (block.type === 'img') {
      const im = images.find((x) => x.filename === block.content)
      const url = im ? URL.createObjectURL(im.file) : ''
      return (
        <div
          key={idx}
          className="w-full h-8rem bg-white-alpha-10 p-3 rounded flex flex-column align-items-center justify-content-center gap-2"
        >
          {im ? (
            <img src={url} alt={block.content} className="w-6rem object-contain" />
          ) : (
            <div className="italic text-sm">Missing file</div>
          )}
        </div>
      )
    }
    return null
  }

  // build HTML string for manifest body: only <p> and <img src="filename" /> allowed
  function buildBodyHtml(lang: 'en' | 'pl' = 'pl', isPreview: boolean = false) {
    return blocks
      .map((b) => {
        if (b.type === 'p') {
          const escapedEn = String(b.content.en ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
          const escapedPl = String(b.content.pl ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')

          if (lang === 'en') return `<p>${escapedEn}</p>`
          if (lang === 'pl') return `<p>${escapedPl}</p>`
        }
        if (b.type === 'img') {
          if (!isPreview) {
            return `<img src='${b.content}' alt='' />`
          }
          const im = images.find((x) => x.filename === b.content)
          const url = im ? URL.createObjectURL(im.file) : ''
          return `<img src=${url} alt=${b.content} class="border-round shadow-2 w-full" />`
        }
        return ''
      })
      .join('\n')
  }

  async function downloadZip() {
    if (!titleEn && !titlePl) {
      if (!confirm('No title set. Continue anyway?')) return
    }
    if (images.length === 0) {
      if (!confirm('No images uploaded. Continue anyway?')) return
    }

    // generate uuid folder name
    const uuid = crypto?.randomUUID?.() ?? `post-${Date.now()}`

    const manifest = {
      title: { en: titleEn, pl: titlePl },
      title_image: titleImageFilename ?? null,
      // use selected date if present, otherwise fallback to now; manifest.created_at stores seconds
      created_at: Math.floor(((datetime24h ? datetime24h.getTime() : Date.now()) as number) / 1000),
      // produce language-specific bodies
      body: { en: buildBodyHtml('en', false), pl: buildBodyHtml('pl', false) },
    }

    const zip = new JSZip()
    const folder = zip.folder(uuid)
    if (!folder) throw new Error('Unable to create zip folder')

    // add manifest
    folder.file('manifest.json', JSON.stringify(manifest, null, 2))

    // add images in img/
    const imgFolder = folder.folder('img')
    if (imgFolder) {
      for (const im of images) {
        const arrayBuffer = await im.file.arrayBuffer()
        imgFolder.file(im.filename, arrayBuffer)
      }
    }

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${uuid}.zip`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const createdAt = datetime24h
    ? formatCreatedAt(datetime24h.getTime() / 1000, previewLang, true)
    : 'No date'

  // Show title according to preview language (fallback to the other language or '(untitled)')
  const previewTitle =
    previewLang === 'pl' ? titlePl || titleEn || '(untitled)' : titleEn || titlePl || '(untitled)'

  return (
    <section className="w-screen min-h-screen navbar-padding pb-5">
      <div className="flex flex-row justify-content-between align-items-center mb-6 px-5">
        <h1 className="text-2xl mt-4">Blog Post Editor</h1>
        <Button
          onClick={downloadZip}
          className="px-4 py-2 bg-green-700 border-white-alpha-30 scale-on-hover"
        >
          Download post ZIP
        </Button>
      </div>
      <section className="mb-6 flex flex-row gap-6 px-5">
        <div className="flex flex-column gap-2 w-4">
          <label className="block">
            <div className="mb-1">Title (EN)</div>
            <InputText
              className="w-full p-2 rounded bg-black-alpha-20 text-white hover:border-white"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
            />
          </label>

          <label className="block">
            <div className="mb-1">Title (PL)</div>
            <InputText
              className="w-full p-2 rounded bg-black-alpha-20 text-white hover:border-white"
              value={titlePl}
              onChange={(e) => setTitlePl(e.target.value)}
            />
          </label>

          <label className="block">
            <div className="mb-1">Date and time</div>
            <Calendar
              id="calendar-24h"
              value={datetime24h}
              onChange={(e) => setDateTime24h(e.value ?? null)}
              showTime
              hourFormat="24"
              className="w-full p-2 rounded bg-black-alpha-20 text-white hover:border-white"
            />
          </label>

          <label className="block">
            <div className="mb-1">Upload images (you can upload multiple)</div>
            <InputText
              className="w-full p-2 rounded bg-black-alpha-20 text-white hover:border-white"
              type="file"
              accept="image/*"
              multiple
              onChange={onImageUpload}
            />
            <div className="mt-2 text-sm text-slate-400">
              Uploaded images will be copied into the post's /img folder and referenced by filename
              in the body.
            </div>
          </label>

          <label className="block">
            <div className="mb-1">Choose title image (optional)</div>
            <Dropdown
              className="w-full bg-black-alpha-20 text-white hover:border-white flex-row align-items-center"
              showClear
              options={images.map((im) => im.filename)}
              value={titleImageFilename ?? ''}
              onChange={(e) => setTitleImageFilename(e.target.value || null)}
            />
          </label>

          <div className="mt-4 border-t pt-4">
            <h3 className="mb-2">Add paragraph</h3>
            <div className="mb-2">
              <div className="mb-1 text-xs text-slate-400">English</div>
              <InputTextarea
                ref={paragraphEnRef}
                className="w-full p-2 rounded bg-black-alpha-20 text-white hover:border-white"
                rows={4}
                placeholder="Type paragraph text (EN) here"
              />
            </div>
            <div className="mb-2">
              <div className="mb-1 text-xs text-slate-400">Polish</div>
              <InputTextarea
                ref={paragraphPlRef}
                className="w-full p-2 rounded bg-black-alpha-20 text-white hover:border-white"
                rows={4}
                placeholder="Type paragraph text (PL) here"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                onClick={addParagraph}
                className="px-3 py-2 bg-white-alpha-10 border-white-alpha-30 scale-on-hover"
              >
                Add paragraph
              </Button>
              <Button
                onClick={() => {
                  // convenience: insert empty paragraph
                  setBlocks((b) => [...b, { type: 'p', content: { en: '', pl: '' } }])
                }}
                className="px-3 py-2 bg-green-700 border-white-alpha-30 scale-on-hover"
              >
                Insert empty paragraph
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-column gap-2 w-full">
          <h3 className="text-lg">Current blocks</h3>
          {blocks.length === 0 ? (
            <div className="italic text-sm">No blocks yet — add paragraphs or upload images</div>
          ) : (
            <div className="flex flex-column gap-3">
              {blocks.map((b, i) => (
                <div key={i} className="flex flex-row gap-3 items-start">
                  <div className="flex-1">{renderBlockPreview(b, i)}</div>
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => moveBlock(i, -1)} className="px-2 py-1 rounded border">
                      ↑
                    </Button>
                    <Button onClick={() => moveBlock(i, 1)} className="px-2 py-1 rounded border">
                      ↓
                    </Button>
                    <Button
                      onClick={() => removeBlock(i)}
                      className="px-2 py-1 rounded bg-red-600 text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <h3 className="mb-2">Uploaded images</h3>
            {images.length === 0 ? (
              <div className="italic text-sm">No images uploaded</div>
            ) : (
              <div className="flex flex-column gap-2">
                {images.map((im) => (
                  <div key={im.filename} className="flex items-center gap-3">
                    <div className="flex-1">{im.filename}</div>
                    <Button
                      onClick={() => removeImage(im.filename)}
                      className="px-2 py-1 rounded bg-red-600 text-white"
                    >
                      Remove
                    </Button>
                    <Button
                      onClick={() => addImageBlock(im.filename)}
                      className="px-2 py-1 rounded bg-green-700 text-white"
                    >
                      Add Block
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-6 flex flex-column justify-content-start align-items-center">
        <h2 className="text-xl mb-3">Preview</h2>
        <div className="w-11 lg:w-6 flex flex-row justify-content-end items-center mb-3">
          <label htmlFor="preview-lang" className="mr-2 text-sm text-slate-400">
            Preview:
          </label>
          <select
            id="preview-lang"
            value={previewLang}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPreviewLang(e.target.value as 'en' | 'pl')
            }
            className="bg-black-alpha-10 text-white p-1 rounded"
          >
            <option value="en">English</option>
            <option value="pl">Polish</option>
          </select>
        </div>
        <div className="w-screen flex flex-column justify-content-start align-items-center pb-4">
          <div className="w-full h-14rem flex flex-column align-items-center justify-content-center text-center">
            <h1>{previewTitle}</h1>
          </div>
          <Card className="w-11 lg:w-10 bg-black-alpha-40 text-white flex flex-column justify-content-center align-items-center pb-5">
            <div className="w-full flex flex-column justify-content-start align-items-center gap-3">
              {titleImageFilename
                ? (() => {
                    const im = images.find((x) => x.filename === titleImageFilename)
                    return im ? (
                      <img
                        src={URL.createObjectURL(im.file)}
                        alt={previewTitle}
                        className="mb-4 border-round shadow-2 w-11 lg:w-6"
                      />
                    ) : null
                  })()
                : null}
              <div className="w-11 lg:w-6 flex flex-column justify-content-start align-items-center gap-5">
                <div className="w-full flex flex-row justify-content-end">
                  <Tag value={createdAt} />
                </div>
                <h2 className="lg:text-3xl">{previewTitle}</h2>
                <h3
                  className="flex flex-column justify-content-start align-items-center gap-5"
                  dangerouslySetInnerHTML={{ __html: buildBodyHtml(previewLang, true) }}
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <div className="mt-6 text-sm text-slate-400">
        Note: exported manifest.json follows your PostManifest type: title, title_image (filename or
        null), created_at (seconds), body with en/pl containing only &lt;p&gt; and &lt;img
        src='filename' /&gt; tags. The ZIP will contain the post folder named with a UUID and an
        img/ subfolder with the image files.
      </div>
    </section>
  )
}

export default PostCreatorPage
