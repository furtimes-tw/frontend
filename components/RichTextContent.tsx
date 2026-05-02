import React from 'react'
import {
  RichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import { normalizeMediaURL } from '@/lib/site'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type MediaValue = {
  url?: string | null
  alt?: string | null
  caption?: string | null
  credit?: string | null
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,

  upload: ({ node }) => {
    const media = node.value as MediaValue | null | undefined

    if (!media || typeof media !== 'object') {
      return null
    }

    if (!media.url) {
      return null
    }

    return (
      <figure className="my-8 flex flex-col items-center">
        <img
          src={normalizeMediaURL(media.url)}
          alt={media.alt ?? ''}
          className="block max-h-[520px] w-auto max-w-full rounded-xl border border-ft-border object-contain"
        />

        {(media.caption || media.credit) && (
          <figcaption className="mt-3 text-center text-sm leading-6 text-ft-muted">
            {media.caption ? <div>{media.caption}</div> : null}

            {media.credit ? (
              <div className="mt-1 text-xs text-ft-subtle">
                圖片來源：{media.credit}
              </div>
            ) : null}
          </figcaption>
        )}
      </figure>
    )
  },
})

export default function RichTextContent({
  content,
}: {
  content: SerializedEditorState | null | undefined
}) {
  if (!content) {
    return <p className="text-ft-muted">無內容</p>
  }

  return (
    <div className="prose prose-neutral max-w-none text-ft-text prose-p:leading-8 prose-a:text-ft-accent prose-a:underline-offset-4 prose-strong:text-ft-text prose-blockquote:border-ft-accent prose-blockquote:text-ft-muted">
      <RichText data={content} converters={jsxConverters} />
    </div>
  )
}
