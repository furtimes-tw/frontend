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

  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag || 'h2'

    if (
      Tag !== 'h1' &&
      Tag !== 'h2' &&
      Tag !== 'h3' &&
      Tag !== 'h4' &&
      Tag !== 'h5' &&
      Tag !== 'h6'
    ) {
      return <h2>{nodesToJSX({ nodes: node.children })}</h2>
    }

    const children = nodesToJSX({ nodes: node.children })

    switch (Tag) {
      case 'h1':
        return <h1>{children}</h1>
      case 'h2':
        return <h2>{children}</h2>
      case 'h3':
        return <h3>{children}</h3>
      case 'h4':
        return <h4>{children}</h4>
      case 'h5':
        return <h5>{children}</h5>
      case 'h6':
        return <h6>{children}</h6>
    }
  },

  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })

    if (node.listType === 'number' || node.tag === 'ol') {
      return <ol>{children}</ol>
    }

    return <ul>{children}</ul>
  },

  listitem: ({ node, nodesToJSX }) => {
    return <li>{nodesToJSX({ nodes: node.children })}</li>
  },

  quote: ({ node, nodesToJSX }) => {
    return <blockquote>{nodesToJSX({ nodes: node.children })}</blockquote>
  },

  link: ({ node, nodesToJSX }) => {
    const rawURL = node.fields?.url || '#'

    let href = rawURL

    try {
      href = decodeURIComponent(rawURL)
    } catch {
      href = rawURL
    }

    const isExternal =
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:')

    return (
      <a
        href={href}
        target={node.fields?.newTab ? '_blank' : undefined}
        rel={node.fields?.newTab || isExternal ? 'noopener noreferrer' : undefined}
      >
        {nodesToJSX({ nodes: node.children })}
      </a>
    )
  },

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
    <div className="rich-text">
      <RichText data={content} converters={jsxConverters} />
    </div>
  )
}
