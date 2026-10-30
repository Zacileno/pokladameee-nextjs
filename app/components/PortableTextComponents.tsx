import Image from 'next/image'
import type { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = urlFor(value).width(1200).url()
      return (
        <Image
          src={url}
          alt={value?.alt || ''}
          width={1200}
          height={720}
          unoptimized
          style={{ width: '100%', height: 'auto' }}
        />
      )
    },
  },
}
