import React from 'react'

type RichTextNode = {
  type?: string
  tag?: string
  format?: string | number
  version?: number
  text?: string
  children?: RichTextNode[]
  direction?: 'ltr' | 'rtl' | null
  indent?: number
  listType?: 'bullet' | 'number' | 'check'
  start?: number
  url?: string
  newTab?: boolean
  fields?: {
    url?: string
    newTab?: boolean
  }
}

type RichTextRoot = {
  root?: {
    children?: RichTextNode[]
  }
}

function renderTextNode(node: RichTextNode, key: React.Key) {
  let content: React.ReactNode = node.text ?? ''

  const format = typeof node.format === 'number' ? node.format : 0

  // Lexical bitwise format flags
  const IS_BOLD = 1
  const IS_ITALIC = 1 << 1
  const IS_STRIKETHROUGH = 1 << 2
  const IS_UNDERLINE = 1 << 3
  const IS_CODE = 1 << 4
  const IS_SUBSCRIPT = 1 << 5
  const IS_SUPERSCRIPT = 1 << 6

  if (format & IS_BOLD) content = <strong>{content}</strong>
  if (format & IS_ITALIC) content = <em>{content}</em>
  if (format & IS_STRIKETHROUGH) content = <s>{content}</s>
  if (format & IS_UNDERLINE) content = <u>{content}</u>
  if (format & IS_CODE) content = <code>{content}</code>
  if (format & IS_SUBSCRIPT) content = <sub>{content}</sub>
  if (format & IS_SUPERSCRIPT) content = <sup>{content}</sup>

  return <React.Fragment key={key}>{content}</React.Fragment>
}

function renderChildren(children?: RichTextNode[]) {
  if (!children || children.length === 0) return null
  return children.map((child, index) => renderNode(child, index))
}

function renderNode(node: RichTextNode, key: React.Key): React.ReactNode {
  switch (node.type) {
    case 'text':
      return renderTextNode(node, key)

    case 'linebreak':
      return <br key={key} />

    case 'paragraph':
      return (
        <p key={key} className="mb-4 leading-7">
          {renderChildren(node.children)}
        </p>
      )

    case 'heading': {
      const tag = node.tag || 'h2'
      const children = renderChildren(node.children)

      if (tag === 'h1') return <h1 key={key} className="mb-6 text-4xl font-bold">{children}</h1>
      if (tag === 'h2') return <h2 key={key} className="mb-5 text-3xl font-bold">{children}</h2>
      if (tag === 'h3') return <h3 key={key} className="mb-4 text-2xl font-semibold">{children}</h3>
      if (tag === 'h4') return <h4 key={key} className="mb-3 text-xl font-semibold">{children}</h4>
      return <h5 key={key} className="mb-3 text-lg font-semibold">{children}</h5>
    }

    case 'quote':
      return (
        <blockquote
          key={key}
          className="mb-4 border-l-4 border-gray-300 pl-4 italic text-gray-700"
        >
          {renderChildren(node.children)}
        </blockquote>
      )

    case 'list':
      if (node.listType === 'number') {
        return (
          <ol key={key} className="mb-4 list-decimal pl-6">
            {renderChildren(node.children)}
          </ol>
        )
      }

      return (
        <ul key={key} className="mb-4 list-disc pl-6">
          {renderChildren(node.children)}
        </ul>
      )

    case 'listitem':
      return <li key={key} className="mb-1">{renderChildren(node.children)}</li>

    case 'link': {
      const href = node.fields?.url || node.url || '#'
      const target = node.fields?.newTab || node.newTab ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined

      return (
        <a
          key={key}
          href={href}
          target={target}
          rel={rel}
          className="text-blue-600 underline underline-offset-2"
        >
          {renderChildren(node.children)}
        </a>
      )
    }

    default:
      return (
        <div key={key} className="mb-4">
          {renderChildren(node.children)}
        </div>
      )
  }
}

export default function RichTextRenderer({ content }: { content: unknown }) {
  if (!content || typeof content !== 'object') {
    return <p>無內容</p>
  }

  const richText = content as RichTextRoot
  const children = richText.root?.children

  if (!children || children.length === 0) {
    return <p>無內容</p>
  }

  return <div className="prose prose-neutral max-w-none">{renderChildren(children)}</div>
}
