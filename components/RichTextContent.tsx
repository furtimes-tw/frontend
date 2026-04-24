import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export default function RichTextContent({
  content,
}: {
  content: SerializedEditorState | null | undefined
}) {
  if (!content) {
    return <p>無內容</p>
  }

  return (
    <div className="prose prose-neutral max-w-none">
      <RichText data={content} />
    </div>
  )
}
