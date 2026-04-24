import React from 'react'
import {
  RichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
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
    console.log('UPLOAD NODE:', node)

    const media = node.value as MediaValue | null | undefined

    if (!media || typeof media !== 'object') {
      return <div className="my-4 rounded border p-4">圖片資料未展開</div>
    }

    if (!media.url) {
      return <div className="my-4 rounded border p-4">圖片缺少 URL</div>
    }

    return (
      <figure className="my-8 flex flex-col items-center">
        <img
          src={media.url}
          alt={media.alt ?? ''}
          className="max-h-[520px] w-auto max-w-full rounded-lg border object-contain"
        />

        {(media.caption || media.credit) && (
          <figcaption className="mt-3 text-center text-sm text-gray-600">
            {media.caption ? <div>{media.caption}</div> : null}
            {media.credit ? (
              <div className="mt-1 text-xs text-gray-500">
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
  if (!content) return <p>無內容</p>

  return (
    <div className="prose prose-neutral max-w-none">
      <RichText data={content} converters={jsxConverters} />
    </div>
  )
}
